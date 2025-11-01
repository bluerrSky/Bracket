const express = require('express');
const http = require('http'); // 1. Import HTTP module for Socket.IO
const session = require('express-session');
const passport = require('./config/passport');
const cors = require('cors');
const { Server } = require('socket.io'); // 2. Import Socket.IO Server

// Import your routers
const indRouter = require('./routes/indRouter');
const judgeRouter = require('./routes/judgeRouter');

const app = express();
// 3. Create the HTTP server instance and attach Express
const server = http.createServer(app); 

// --- Socket.IO Initialization and Configuration ---
const io = new Server(server, {
    cors: {
        // IMPORTANT: Use your actual Vercel/Render URLs here
        // The frontend makes the connection, so this is the 'origin'
        origin: [
            "http://localhost:5173", // Local Development URL
            "https://your-vercel-frontend.vercel.app", // Vercel Production URL (REPLACE THIS!)
            "https://your-render-backend.onrender.com" // If frontend talks to backend's domain
        ], 
        credentials: true,
        methods: ["GET", "POST"]
    }
});

let onlineUsersCount = 0;

io.on('connection', (socket) => {
    // 4. User Connects: Increment count and broadcast update
    onlineUsersCount++;
    console.log(`User connected. Current users: ${onlineUsersCount}`);
    io.emit('online_count_update', onlineUsersCount);

    // 5. User Disconnects: Decrement count and broadcast update
    socket.on('disconnect', () => {
        onlineUsersCount = Math.max(0, onlineUsersCount - 1); // Prevent negative count
        console.log(`User disconnected. Current users: ${onlineUsersCount}`);
        io.emit('online_count_update', onlineUsersCount);
    });
});
// --- End Socket.IO ---


// --- CORS Configuration ---
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://your-vercel-frontend.vercel.app", // REPLACE THIS!
    ],
    credentials: true, // Allow sending/receiving cookies across domains
}));


app.use(express.json());


// --- Session Configuration (Fixes "secret option required" error) ---
if (!process.env.SECRET) {
    console.error("FATAL ERROR: SESSION_SECRET not defined in environment variables.");
    // In a real application, you'd throw an error here: throw new Error("SESSION_SECRET is required.");
}

app.use(session({
    secret: process.env.SECRET || 'a_fallback_secret_key_for_dev_only', // Use ENV var
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        // IMPORTANT for Vercel/Render deployment:
        secure: process.env.NODE_ENV === 'production', // Use 'secure: true' in production (HTTPS)
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Use 'none' for cross-domain
    }
}));


// --- Passport and Routing ---
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indRouter);
app.use('/submit', judgeRouter);


// --- Server Listener ---
const PORT = process.env.PORT || 8080;

// IMPORTANT: Use server.listen() instead of app.listen()
server.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
});