// authController.js
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');
const { body, validationResult, matchedData } = require('express-validator');
const crypto = require('crypto'); // Built-in Node.js module for OTP
const { sendVerificationEmail } = require('../config/emailService'); // Adjust path as needed

function getInd(req, res) {
    return res.status(200).json({ message: 'Hi', status: 'success' });
}


const validateSignup = [
    body('username')
        .trim()
        .isLength({ min: 3, max: 30 }).withMessage("Username must be between 3 and 30 characters")
        .isAlphanumeric().withMessage('Username must contain only letters and numbers') 
        .escape() 
        .custom(async (username) => { 
           try {
                const { rows } = await pool.query("SELECT 1 FROM users WHERE username = $1", [username]);
                if (rows.length > 0) return Promise.reject('Username already exists');
            } catch (err) { return Promise.reject('Error checking username'); }
        }),
    body('email')
        .trim() 
        .normalizeEmail() 
        .isEmail().withMessage('Invalid email format') 
        .custom(async (email) => { 
            try {
                const { rows } = await pool.query("SELECT 1 FROM users WHERE email = $1", [email]);
                if (rows.length > 0) return Promise.reject('Email already exists');
            } catch (err) { return Promise.reject('Error checking email'); }
        }),
    body('password')
        .trim() 
        .isStrongPassword({
            minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1
        }).withMessage('Password must be at least 8 characters long...'),
];

const validateLogin = [
    body('username').trim().notEmpty().withMessage('Username is required').escape(), 
    body('password').trim().notEmpty().withMessage('Password is required') 
];

// --- MODIFIED logAuth ---
// We add a check for user.is_verified
const logAuth = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }

    passport.authenticate('local', (err, user, info) => {
        if (err) { 
            return res.status(500).json({ success: false, message: 'Internal server error' }); 
        }
        if (!user) { 
            return res.status(401).json({ success: false, message: info.message }); 
        }
        
        // --- NEW VERIFICATION CHECK ---
        if (!user.is_verified) {
            return res.status(401).json({ 
                success: false, 
                message: 'Email not verified. Please check your inbox for an OTP.',
                verification_pending: true, // Send a flag to the frontend
                email: user.email // Send email to help frontend
            });
        }
        // --- END OF NEW CHECK ---

        req.login(user, (err) => {
            if (err) { 
                return res.status(500).json({ success: false, message: 'Login failed' }); 
            }
            // User is verified and logged in
            return res.status(200).json({ success: true, user, message: 'Login successful' });
        });
    })(req, res, next);
};

// --- NEW signAuth (Now called registerUser) ---
// This function *only* registers. It does not log the user in.
const registerUser = async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    
    const {username, email, password} = matchedData(req); 
    
    try {
        const hashPass = await bcrypt.hash(password, 12);
        
        // 1. Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        // 2. Set expiry time (e.g., 10 minutes from now)
        const expires_at = new Date(Date.now() + 10 * 60 * 1000); 

        // 3. Insert user with verification fields
        const { rows } = await pool.query(
            `INSERT INTO users (username, email, password, is_verified, verification_otp, otp_expires_at) 
             VALUES ($1, $2, $3, FALSE, $4, $5) 
             RETURNING user_id, username, email;`,
            [username, email, hashPass, otp, expires_at]
        );
        const user = rows[0];
        console.log(`[registerUser] User ${user.username} created. Sending OTP...`);
        
        // 4. Send the verification email
        await sendVerificationEmail(user.email, otp);
        
        // 5. Respond to the client
        return res.status(201).json({ 
            success: true, 
            message: 'Registration successful. Please check your email for a verification OTP.',
            email: user.email // Send email to frontend to pre-fill verification form
        });

    } catch (err) {
        console.error("registerUser: Error:", err.message);
        if (err.code === '23505') { 
            return res.status(409).json({ success: false, message: 'Username or Email already exists' }); 
        }
        if (err.message === 'Failed to send verification email.') {
             return res.status(500).json({ success: false, message: 'Failed to create user. Could not send verification email.' });
        }
        return res.status(500).json({ success: false, message: 'Server error!' });
    }
};

// --- NEW verifyEmail Function ---
const verifyEmail = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required.' });
    }

    try {
        // 1. Find the user by email
        const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userRes.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }
        
        const user = userRes.rows[0];

        // 2. Check user status and OTP
        if (user.is_verified) {
            return res.status(400).json({ success: false, message: 'Email is already verified.' });
        }

        if (user.verification_otp !== otp) {
            return res.status(400).json({ success: false, message: 'Invalid OTP.' });
        }

        if (new Date() > new Date(user.otp_expires_at)) {
            return res.status(400).json({ success: false, message: 'OTP has expired. Please request a new one.' });
        }

        // 3. All checks passed! Verify the user.
        await pool.query(
            `UPDATE users 
             SET is_verified = TRUE, verification_otp = NULL, otp_expires_at = NULL 
             WHERE user_id = $1`,
            [user.user_id]
        );
        
        console.log(`[verifyEmail] User ${user.username} verified successfully.`);

        // 4. Log the user in immediately after verification
        // We must strip the sensitive data before logging in
        const userToLogin = {
            user_id: user.user_id,
            username: user.username,
            email: user.email
            // ... add any other non-sensitive fields you need in req.user
        };

        req.login(userToLogin, (err) => {
            if (err) { 
                return res.status(500).json({ success: false, message: 'Verification successful, but login failed.' }); 
            }
            return res.status(200).json({ 
                success: true, 
                user: userToLogin, 
                message: 'Email verified successfully! You are now logged in.' 
            });
        });

    } catch (err) {
        console.error("verifyEmail: Error:", err.message);
        res.status(500).json({ success: false, message: 'Server error during verification.' });
    }
};


// --- checkAuth (Unchanged) ---
const checkAuth = function (req, res) {
    if (req.isAuthenticated()) {
        // Add a check here just in case, though logAuth should prevent unverified logins
        if (!req.user.is_verified) {
            req.logout(err => {}); // Log out the unverified user
            return res.status(401).json({ success: false, message: 'User not verified.' });
        }
        return res.status(200).json({ success: true, user: req.user });
    } else {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
};

module.exports = {
    getInd,
    logAuth,
    registerUser, // Renamed from signAuth
    verifyEmail,  // New function
    checkAuth,
    validateLogin,
    validateSignup,
};