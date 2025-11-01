// app.js
// 1. Load .env FIRST
require('dotenv').config();

// 2. Load Modules
const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
const pool = require('./db/pool'); // Import the pool to test it

// 3. Load Routers
const indRouter = require('./routes/indRouter');
const judgeRouter = require('./routes/judgeRouter.js');

const app = express();
const IS_PROD = app.get('env') === 'production';

// 4. Setup Middleware
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', "https://bracket-gvlg10tk3-bluerrskys-projects.vercel.app"], 
    credentials: true
}));

app.set('trust proxy', 1);
const SECRET = process.env.SECRET;
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: IS_PROD,
        sameSite: IS_PROD ? 'none' : 'lax',
        maxAge: 1000 * 60 * 60 * 24 
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

// 5. Setup Routes
app.use('/',indRouter);
app.use('/submit',judgeRouter);

const PORT = process.env.PORT||8080;

// 6. Create a safe start function
async function startServer() {
    try {
        console.log('--- Testing database connection... ---');
        const client = await pool.connect();
        console.log('✅ --- Database connection successful! ---');
        client.release();

        app.listen(PORT, () => {
            console.log(`✅ Server is now securely listening on PORT:${PORT}`);
        });

    } catch (err) {
        console.error('❌ --- DATABASE CONNECTION FAILED TO START --- ❌');
        console.error(err.message);
        process.exit(1); // Exit with an error
    }
}

// 7. Start the server
startServer();