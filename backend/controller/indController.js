const passport=require('../config/passport');
const bcrypt=require('bcryptjs');
const pool=require('../db/pool');

function getInd(req,res){
    res.status(200).json({
        message:'Hi',
        status:'success'
    });
}
const logAuth=passport.authenticate('local',(err,user,info)=>{
    if(err){
        return res.status(500).json({success:false,message:'Internal server error'});
    }
    if(!user){
        return res.status(401).json({success:false,message:info.message});

    }
    req.login(user,(err)=>{
        if(err){
            return res.status(500).json({success:false,message:'Login failed'});

        }
        return res.status(200).json({success:true,user,message:'Login successful'});

    })
});
const signAuth=async function(req,res){
    try{
        console.log("Sign up attempted.")
        const hashPass=await bcrypt.hash(req.body.password,12);
        const {rows}=await pool.query('Insert into users (username,email,password) values ($1,$2,$3) RETURNING user_id,username,email;',[
            req.body.username,
            req.body.email,
            hashPass
        ]);
        const user=rows[0];
        req.login(user,(err)=>{
            if(err){
                return res.status(500).json({success:false,message:'Sign up successful, but Login failed'});

            }
            return res.status(200).json({success:true,user,message:'Sign up and Login successful'});
        })

    }catch(err){
        console.error(err.message);
        if(err.code == '23505'){
            return res.status(409).json({success:false,message: 'Username or Email already exists'});
        }
        return res.status(500).json({success:false,message:'Server error!'});
    }
}

module.exports={getInd,logAuth,signAuth};