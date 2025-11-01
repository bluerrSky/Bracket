const express=require('express');
const path=require('path');
const cors=require('cors');
require('dotenv').config();
const session=require('express-session');
const passport=require('./config/passport');

const indRouter=require('./routes/indRouter');
const judgeRouter=require('./routes/judgeRouter.js');

const app=express();
const IS_PROD = app.get('env') === 'production';

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', "https://bracket-eight.vercel.app"], 
    credentials: true
}));

app.set('trust proxy', 1);
const SECRET=process.env.SECRET;
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: IS_PROD, // Use secure cookies in production
        sameSite: IS_PROD ? 'none' : 'lax', // 'lax' is safer for development
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));
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