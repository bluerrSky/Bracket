// routes/indRouter.js
const express = require('express');
const router = express.Router();

const authController = require('../controller/authController');

// Auth 
router.get('/', authController.getInd);
router.post(
    '/signup', 
    authController.validateSignup, 
    authController.registerUser 
);
router.post(
    '/login', 
    authController.validateLogin, 
    authController.logAuth
);
router.get('/check-auth', authController.checkAuth);

router.post('/verify-email', authController.verifyEmail);

module.exports = router;