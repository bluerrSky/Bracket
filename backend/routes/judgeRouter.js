// routes/judgeRouter.js
const express=require('express');
const router=express.Router();
const {newSub}=require('../controller/judgeController'); // Removed getStatus as it's commented out

router.post('/',newSub);

// router.get('/submissions/:token',getStatus);

module.exports=router;