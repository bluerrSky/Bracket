const express=require('express');
const router=express.Router();
const {getInd,logAuth,signAuth,getProblemByID, getProblemsByCategory}=require('../controller/indController');

router.get('/',getInd);
router.post('/signup',signAuth);

router.post('/login',logAuth);

router.get("/problems/:id", getProblemByID)
router.get('/problems/category/:category', getProblemsByCategory);
module.exports=router;