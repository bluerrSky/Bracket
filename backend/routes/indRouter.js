const express=require('express');
const router=express.Router();
const {getInd,logAuth,signAuth,checkAuth,getProblemById,getProblemsByCat}=require('../controller/indController');

router.get('/',getInd);
router.post('/signup',signAuth);

router.post('/login',logAuth);
router.get('/check-auth',checkAuth);


router.get('/problems/:id',getProblemById);
router.get('/problems/category/:category',getProblemsByCat);

module.exports=router;