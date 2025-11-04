// app.js
console.log(`[SERVER START] NODE_ENV is: '${process.env.NODE_ENV}'`); // For verifying production mode

const express = require('express');
require('dotenv').config();
const http = require('http');
const session = require('express-session');
const passport = require('./config/passport'); // your passport config
const cors = require('cors');
const { Server } = require('socket.io');

// --- 1. IMPORTS FOR SESSION STORE ---
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db/pool'); // Import your existing database pool

// routers
const authRouter = require('./routes/authRouter');
const judgeRouter = require('./routes/judgeRouter');
const contentRouter = require('./routes/contentRouter');
const adaptiveRouter = require('./routes/adaptiveRouter');

const app = express();
const server = http.createServer(app);

// --- Environment / mode ---
const isProd = process.env.NODE_ENV === 'production';

// trust proxy when behind a TLS-terminating proxy (Render, Heroku, etc.)
if (isProd) {
    console.log("Trusting proxy in production.");
    app.set('trust proxy', 1);
}

// --- CORS (allow credentials) ---
// Add any client origins you use here exactly
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://bracket-eight.vercel.app", // your deployed frontend
  // add other origins if needed
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// TEMP DEBUG - add right after app.use(express.json()) and before app.use(sessionMiddleware)
app.use((req, res, next) => {
  console.log('===== REQ START =====');
  console.log('[DBG] Time:', new Date().toISOString());
  console.log('[DBG] URL:', req.method, req.originalUrl);
  console.log('[DBG] Origin header:', req.headers.origin);
  console.log('[DBG] Cookie header present?:', !!req.headers.cookie);
  if (req.headers.cookie) {
    // print only the first 300 chars to avoid huge logs
    console.log('[DBG] Cookie (truncated):', String(req.headers.cookie).slice(0, 300));
  }
  next();
});


// --- 2. CONFIGURE PG SESSION STORE ---
const sessionStore = new pgSession({
  pool: pool, // Use your existing database pool
  tableName: 'user_sessions', // This table will be created automatically
  createTableIfMissing: true,
});

// --- 3. SESSION MIDDLEWARE (USING NEW STORE) ---
const sessionMiddleware = session({
  store: sessionStore, // Tell express-session to use Postgres
  secret: process.env.SESSION_SECRET || process.env.SECRET || 'dev_fallback_secret',
  resave: false,
  saveUninitialized: false,
  proxy: isProd, // Required for 'secure: true' cookies behind a proxy
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    secure: isProd,              // true in production (HTTPS), false for local dev
    sameSite: isProd ? 'none' : 'lax' // 'none' for cross-site prod, 'lax' for local
  }
});

// Apply session + passport to express
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// TEMP DEBUG - after passport.session()
app.use((req, res, next) => {
  console.log('--- POST-PASSPORT MIDDLEWARE ---');
  console.log('[DBG2] URL:', req.method, req.originalUrl);
  console.log('[DBG2] sessionID:', req.sessionID);
  console.log('[DBG2] session keys:', req.session ? Object.keys(req.session) : null);
  // If you store passport user under req.session.passport, show it
  try {
    console.log('[DBG2] session.passport (truncated):', req.session && req.session.passport ? JSON.stringify(req.session.passport).slice(0,200) : null);
  } catch (e) {
    console.log('[DBG2] session.passport (error stringify)');
  }
  console.log('[DBGD2] req.user present?:', !!req.user, 'user id:', req.user ? (req.user.user_id || req.user.id) : null);
  next();
});

// --- Socket.IO setup ---
// Allow the same origins for socket.io CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST']
  }
});

// Helper to use express middleware with socket.io
const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

// Share express-session & passport with socket.request
io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

// Optional: small logger for socket auth
io.use((socket, next) => {
  const sessPresent = !!socket.request.session;
  const userPresent = !!socket.request.user;
  console.log(`[Socket Auth] session? ${sessPresent}, user? ${userPresent}, user_id: ${socket.request.user ? socket.request.user.user_id : 'N/A'}`);
  next();
});

// --- Online users tracker (unique users across tabs) ---
const onlineUsers = new Map();

// connection handling
io.on('connection', (socket) => {
  // passport attaches user to socket.request.user (if authenticated)
  const user = socket.request.user;

  if (user && (user.user_id || user.id)) {
    // adapt to your user object: user.user_id or user.id
    const userId = user.user_id || user.id;

    const currentCount = onlineUsers.get(userId) || 0;
    onlineUsers.set(userId, currentCount + 1);

    console.log(`[Socket] User ${userId} connected. Tabs: ${currentCount + 1}`);
  } else {
    console.log('[Socket] Guest connected.');
  }

  // emit unique online count (size of map)
  io.emit('online_count_update', onlineUsers.size);
  console.log(`[Socket] Unique users online: ${onlineUsers.size}`);

  socket.on('disconnect', () => {
    const _user = socket.request.user;
    if (_user && (_user.user_id || _user.id)) {
      const userId = _user.user_id || _user.id;
      const count = onlineUsers.get(userId);

      if (count) {
        if (count === 1) {
          onlineUsers.delete(userId);
          console.log(`[Socket] User ${userId} fully disconnected.`);
        } else {
          onlineUsers.set(userId, count - 1);
          console.log(`[Socket] User ${userId} closed a tab. Remaining: ${count - 1}`);
        }
      }
    } else {
      console.log('[Socket] Guest disconnected.');
    }

    io.emit('online_count_update', onlineUsers.size);
    console.log(`[Socket] Unique users online: ${onlineUsers.size}`);
  });
});

// --- Routes ---
app.use('/', authRouter);
app.use('/submit', judgeRouter);
app.use('/content', contentRouter);
app.use('/adaptive', adaptiveRouter);

// basic index (optional)
app.get('/ping', (req, res) => res.json({ ok: true, user: req.user || null }));

// start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (env=${process.env.NODE_ENV || 'development'})`);
});