const express = require('express');
const router = express.Router();
const {
    getProblemById,
    getProblemsByCat,
    getAllTopics,
    getTutorial
    
} = require('../controller/contentController');

const { ensureAuthenticated } = require('../middleware/authMiddleware');

router.get('/problems/:id',ensureAuthenticated, getProblemById);
router.get('/problems/category/:category',ensureAuthenticated, getProblemsByCat);


router.get('/topics', getAllTopics); // Gets all topics for the form


router.get('/tutorial/:topic', getTutorial); // Gets a specific tutorial's content



module.exports=router;