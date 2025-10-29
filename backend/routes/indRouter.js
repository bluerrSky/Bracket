const express=require('express');
const router=express.Router();
const {getInd,logAuth,signAuth,checkAuth,getProblemById,getProblemsByCat,getAIHint,getAIResources}=require('../controller/indController');

router.get('/',getInd);
router.post('/signup',signAuth);

router.post('/login',logAuth);
router.get('/check-auth',checkAuth);


router.get('/problems/:id',getProblemById);
router.get('/problems/category/:category',getProblemsByCat);


router.post('/get-hint',getAIHint);
router.post('/get-resources', getAIResources);


module.exports=router;