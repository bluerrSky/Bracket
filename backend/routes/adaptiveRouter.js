const express = require('express');
const router = express.Router();
const {
    getAIHint,
    getAIResources,
    generateLearningPath,
    getLearningPath,
    submitOnboarding,
    submitTutorialFeedback
    
} = require('../controller/adaptiveController');


// AI help
router.post('/get-hint', getAIHint);
router.post('/get-resources', getAIResources);



// ADAPTIVE ROUTES 

// 1. Onboarding
router.post('/onboarding', submitOnboarding); // Submits the form, returns a new path

// 2. Tutorials & Feedback
router.post('/tutorial-feedback', submitTutorialFeedback); // Submits feedback, gets remediation

// 3. Learning Path (Original)
router.post('/generate-path', generateLearningPath); // Manually trigger a new path
router.get('/get-path', getLearningPath); // Get the current path


module.exports=router;