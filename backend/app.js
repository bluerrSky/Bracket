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

const server = http.createServer(app); 

// Socket.IO Initialization and Configuration
const io = new Server(server, {
    cors: {
        
        // The frontend makes the connection, so this is the 'origin'
        origin: [
            "http://localhost:5173", // Local Development URL
"https://bracket-eight.vercel.app",
            "https://bracket-1.onrender.com" // If frontend talks to backend's domain
        ], 
        credentials: true,
        methods: ["GET", "POST"]
    }
});

let onlineUsersCount = 0;

io.on('connection', (socket) => {
   
    onlineUsersCount++;
    console.log(`User connected. Current users: ${onlineUsersCount}`);
    io.emit('online_count_update', onlineUsersCount);

    
    socket.on('disconnect', () => {
        onlineUsersCount = Math.max(0, onlineUsersCount - 1); 
        console.log(`User disconnected. Current users: ${onlineUsersCount}`);
        io.emit('online_count_update', onlineUsersCount);
    });
});




app.use(cors({
    origin: [
        "http://localhost:5173",
"https://bracket-eight.vercel.app"
    ],
    credentials: true, 
}));


app.use(express.json());


if (!process.env.SECRET) {
    console.error("FATAL ERROR: SESSION_SECRET not defined in environment variables.");
}

app.use(session({
    secret: process.env.SECRET || 'a_fallback_secret_key_for_dev_only', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        
        secure: process.env.NODE_ENV === 'production', // Use 'secure: true' in production (HTTPS)
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax' // Use 'none' for cross-domain
    }
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/', authRouter);
app.use('/submit', judgeRouter);
app.use('/content', contentRouter);
app.use('/adaptive', adaptiveRouter);


const PORT = process.env.PORT || 8080;


server.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`);
});