const express=require('express');
const router=express.Router();
const {getInd,logAuth,signAuth,getProblemById,getProblemsByCat}=require('../controller/indController');

router.get('/',getInd);
router.post('/signup',signAuth);

router.post('/login',logAuth);

router.get('/problems/:id',getProblemById);
router.get('/problems/category/:category',getProblemsByCat);

module.exports=router;