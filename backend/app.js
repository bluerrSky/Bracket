const express = require('express');
require('dotenv').config();
const http = require('http'); 
const session = require('express-session');
const passport = require('./config/passport');
const cors = require('cors');
const { Server } = require('socket.io'); 

// routers
const authRouter = require('./routes/authRouter');
const judgeRouter = require('./routes/judgeRouter');
const contentRouter = require('./routes/contentRouter');
const adaptiveRouter=require('./routes/adaptiveRouter');

const app = express();
app.set('trust proxy', 1);
const server = http.createServer(app); 

// --- FIX 1: Use a Map to track unique users and their connection count ---
// We will store { userId -> numberOfTabsOpen }
const onlineUsers = new Map();

// Socket.IO Initialization and Configuration
const io = new Server(server, {
    cors: {
        origin: [
            "http://localhost:5173", 
            "https://bracket-eight.vercel.app",
            "https://bracket-1.onrender.com"
        ], 
        credentials: true,
        methods: ["GET", "POST"]
    }
});

// --- FIX 2: Create the session middleware first, so we can share it ---
if (!process.env.SECRET) {
    console.error("FATAL ERROR: SESSION_SECRET not defined in environment variables.");
    // In a real app, you'd exit here: process.exit(1);
}

const sessionMiddleware = session({
    secret: process.env.SECRET || 'a_fallback_secret_key_for_dev_only', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        
        // --- The fix: Force these settings ---
        secure: true,      // Cookie must be sent over HTTPS
        sameSite: 'none'   // Allow cross-domain cookie
    }
});


// --- Socket.IO Connection Logic ---
io.on('connection', (socket) => {
    // --- FIX 4: Get the user from the socket's session ---
    // This 'user' object is attached by the passport middleware
    const user = socket.request.user;

    // Only track authenticated users
    if (user && user.user_id) {
        const userId = user.user_id;

        // Get current connection count (0 if this is their first tab)
        const connectionCount = onlineUsers.get(userId) || 0;
        
        // Set new count
        onlineUsers.set(userId, connectionCount + 1);
        
        console.log(`[Socket] User ${userId} connected. Total tabs: ${connectionCount + 1}.`);
        
    } else {
        console.log("[Socket] A guest connected.");
        // You could track guests here if you want, e.g., using socket.id
    }

    // The 'online_count' is now the *size* of the Map (unique users)
    const uniqueUserCount = onlineUsers.size;
    io.emit('online_count_update', uniqueUserCount);
    console.log(`[Socket] Unique users online: ${uniqueUserCount}`);

    
    socket.on('disconnect', () => {
        // --- FIX 5: Decrement/remove the user on disconnect ---
        if (user && user.user_id) {
            const userId = user.user_id;
            
            const connectionCount = onlineUsers.get(userId);

            if (connectionCount) {
                if (connectionCount === 1) {
                    // This was their last tab, remove them
                    onlineUsers.delete(userId);
                    console.log(`[Socket] User ${userId} fully disconnected.`);
                } else {
                    // They still have other tabs, just decrement
                    onlineUsers.set(userId, connectionCount - 1);
                    console.log(`[Socket] User ${userId} closed a tab. Remaining: ${connectionCount - 1}.`);
                }
            }
        } else {
            console.log("[Socket] A guest disconnected.");
        }

        // The 'online_count' is the *size* of the Map
        const uniqueUserCount = onlineUsers.size;
        io.emit('online_count_update', uniqueUserCount);
        console.log(`[Socket] Unique users online: ${uniqueUserCount}`);
    });
});
// --- End of Socket Logic ---


app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://bracket-eight.vercel.app"
    ],
    credentials: true, 
}));


app.use(express.json());


// --- FIX 3: Use the middleware for Express AND Socket.IO ---
// Apply to Express
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Apply to Socket.IO
io.engine.use(sessionMiddleware);
io.engine.use(passport.initialize());
io.engine.use(passport.session());
// --- End of Fix 3 ---


app.use('/', authRouter);
app.use('/submit', judgeRouter);
app.use('/content', contentRouter);
app.use('/adaptive', adaptiveRouter);


const PORT = process.env.PORT || 8080;


server.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
});