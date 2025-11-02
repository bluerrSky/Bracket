const express = require('express');
const router = express.Router();
const {
    getProblemById,
    getProblemsByCat,
    getAllTopics,
    getTutorial
    
} = require('../controller/contentController');


router.get('/problems/:id', getProblemById);
router.get('/problems/category/:category', getProblemsByCat);


router.get('/topics', getAllTopics); // Gets all topics for the form


router.get('/tutorial/:topic', getTutorial); // Gets a specific tutorial's content



module.exports=router;