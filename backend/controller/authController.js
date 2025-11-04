const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');
const { body, validationResult, matchedData } = require('express-validator');


function getInd(req, res) {
    return res.status(200).json({ message: 'Hi', status: 'success' });
}



const validateSignup = [
    // Username validation
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters")
        .isAlphanumeric().withMessage('Username must contain only letters and numbers') 
        .escape() 
        .custom(async (username) => { 
           
            try {
                const { rows } = await pool.query("SELECT 1 FROM users WHERE username = $1", [username]);
                if (rows.length > 0) {
                    
                    return Promise.reject('Username already exists');
                }
            } catch (err) {
                console.error("Error in username custom validator:", err.message);
                return Promise.reject('Error checking username');
            }
        }),

    // Email validation
    body('email')
        .trim() 
        .normalizeEmail() 
        .isEmail().withMessage('Invalid email format') 
        .custom(async (email) => { 
            try {
                const { rows } = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
                if (rows.length > 0) {
                    return Promise.reject('Email already exists');
                }
            } catch (err) {
                console.error("Error in email custom validator:", err.message);
                return Promise.reject('Error checking email');
            }
        }),

    // Password validation
    body('password')
        .trim() 
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.'),

];


const validateLogin = [
    
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required') 
        .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters")
        .escape(), 

    // Password validation
    body('password')
        .trim() 
        .notEmpty().withMessage('Password is required') 
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
            // inside req.login callback after success
            console.log('[AUTH] login success - user id:', user.user_id || user.id || '(no id)');
            console.log('[AUTH] req.sessionID after login:', req.sessionID);
            console.log('[AUTH] req.session keys after login:', req.session ? Object.keys(req.session) : null);
            console.log('[AUTH] response Set-Cookie header (if any):', res.getHeader ? res.getHeader('Set-Cookie') : '(no header API)');

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
    
    
    const {username, email, password} = matchedData(req); 
    
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

module.exports = {
    getInd,
    logAuth,
    signAuth,
    checkAuth,
    validateLogin,
    validateSignup,
};