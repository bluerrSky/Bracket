const express=require('express');
const router=express.Router();
const {getInd,logAuth,signAuth}=require('../controller/indController');

router.get('/',getInd);
router.post('/signup',signAuth);

router.post('/login',logAuth);

module.exports=router;