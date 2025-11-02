const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');
const {body,validationResult,matchedData}=require('express-validator');


function getInd(req, res) {
    
    return res.status(200).json({ message: 'Hi', status: 'success' });
}


const lengthErr="must be between 3 and 30 characters";

const validateSignup = [
    // Username validation
    body('username').trim()
        
        .isLength({ min: 3, max: 30 }).withMessage(`Username ${lengthErr}`)
        .isString().withMessage('Username format error'), 
    
    // Email validation
    body('email').trim()
        .isEmail().withMessage('Invalid email format'),
        
    // Password validation
    body('password').trim()
        .isLength({ min: 5, max: 20 }).withMessage('Password must be between 5 and 20 characters'),
];

const validateLogin = [
    // Username validation 
    body('username').trim().isLength({ min: 3,max:30 }).withMessage(`Username ${lengthErr}`), 
    // Password validation 
    body('password').trim()
        .isLength({ min: 5, max: 20 }).withMessage('Password must be between 5 and 20 characters'),
];
const logAuth = (req, res, next) => {
    
    const errors=validationResult(req);
    if (!errors.isEmpty()) {
        console.warn("logAuth: Validation failed:", errors.array());
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) { 
            
            return res.status(500).json({ success: false, message: 'Internal server error' }); 
        }
        if (!user) { 
            
            return res.status(401).json({ success: false, message: info.message }); 
        }
        req.login(user, (err) => {
            if (err) { 
                
                return res.status(500).json({ success: false, message: 'Login failed' }); 
            }
            
            return res.status(200).json({ success: true, user, message: 'Login successful' });
        });
    })(req, res, next);
};

const signAuth = async function (req, res) {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.warn("signAuth: Validation failed:", errors.array());
    
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    const {username,email,password}=matchedData(req);
    try {
       
        const hashPass = await bcrypt.hash(password, 12);
        const { rows } = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email;',
            [username, email, hashPass]
        );
        const user = rows[0];
        console.log(`[signAuth] User ${user.username} created.`);
        
        req.login(user, (err) => {
            if (err) { 
                console.error("signAuth: Session save error:", err);
                return res.status(500).json({ success: false, message: 'Sign up successful, but Login failed' }); 
            }
            console.log(`signAuth:  User ${user.username} logged in.`);
            return res.status(200).json({ success: true, user, message: 'Sign up and Login successful' });
        });
    } catch (err) {
        console.error("signAuth: Error:", err.message);
        if (err.code === '23505') { return res.status(409).json({ success: false, message: 'Username or Email already exists' }); }
        return res.status(500).json({ success: false, message: 'Server error!' });
    }
};

const checkAuth = function (req, res) {
    console.log("checkAuth: GET /check-auth");
    if (req.isAuthenticated()) {
        console.log(`checkAuth: User is authenticated: ${req.user.username}`);
        return res.status(200).json({ success: true, user: req.user });
    } else {
        console.log("checkAuth: User is not authenticated.");
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
};


// --- 4. EXPORT ALL FUNCTIONS ---
module.exports = {
    getInd,
    logAuth,
    signAuth,
    checkAuth,
    validateLogin,
    validateSignup,
};