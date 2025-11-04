// routes/indRouter.js
const express = require('express');
const router = express.Router();
const {
    getInd,
    logAuth,
    signAuth,
    checkAuth,
    validateLogin,
    validateSignup,
    preAuth,
    logOut
    
} = require('../controller/authController');

// Auth
router.get('/', getInd);
router.post('/signup', preAuth,validateSignup,signAuth);
router.post('/login',preAuth,validateLogin, logAuth);
router.get('/check-auth', checkAuth);
router.post('/logout', logOut); // 👈 Add this route
// Problems


module.exports = router;