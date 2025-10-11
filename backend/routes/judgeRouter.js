const express=require('express');
const router=express.Router();
const {newSub,getStatus}=require('../controller/judgeController');

router.post('/',newSub);

// router.get('/submissions/:token',getStatus);


module.exports=router;