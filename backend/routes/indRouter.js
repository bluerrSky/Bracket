// routes/indRouter.js
const express = require('express');
const router = express.Router();
const {
    getInd,
    logAuth,
    signAuth,
    checkAuth,
    getProblemById,
    getProblemsByCat,
    getAIHint,
    getAIResources,
    generateLearningPath,
    getLearningPath,
    getAllTopics,
    submitOnboarding,
    getTutorial,
    submitTutorialFeedback
} = require('../controller/indController');

// Auth
router.get('/', getInd);
router.post('/signup', signAuth);
router.post('/login', logAuth);
router.get('/check-auth', checkAuth);

// Problems & AI Help
router.get('/problems/:id', getProblemById);
router.get('/problems/category/:category', getProblemsByCat);
router.post('/get-hint', getAIHint);
router.post('/get-resources', getAIResources);

// --- NEW ADAPTIVE ROUTES ---

// 1. Onboarding
router.get('/topics', getAllTopics); // Gets all topics for the form
router.post('/onboarding', submitOnboarding); // Submits the form, returns a new path

// 2. Tutorials & Feedback
router.get('/tutorial/:topic', getTutorial); // Gets a specific tutorial's content
router.post('/tutorial-feedback', submitTutorialFeedback); // Submits feedback, gets remediation

// 3. Learning Path (Original)
router.post('/generate-path', generateLearningPath); // Manually trigger a new path
router.get('/get-path', getLearningPath); // Get the current path

module.exports = router;