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
    
    
} = require('../controller/authController');

// Auth
router.get('/', getInd);
router.post('/signup', validateSignup,signAuth);
router.post('/login',validateLogin, logAuth);
router.get('/check-auth', checkAuth);

// Problems


module.exports = router;