const express=require('express');
const path=require('path');
const cors=require('cors');
require('dotenv').config();
const session=require('express-session');
const passport=require('./config/passport');

const indRouter=require('./routes/indRouter');
const judgeRouter=require('./routes/judgeRouter.js');

const app=express();

app.use(express.json());
app.use(cors());

const SECRET=process.env.SECRET;
app.use(session({secret:SECRET,resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));


app.use('/',indRouter);
app.use('/submit',judgeRouter);

const PORT=process.env.PORT||8080;

app.listen(PORT,()=>{
    console.log(`server listening on PORT:${PORT}`);
});