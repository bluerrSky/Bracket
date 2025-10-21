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
const getProblemById= async function(req,res){
    try{
        const {id}=req.params;
        const problem=await pool.query(`select problem_id,category,title,description,difficulty,time_limit,memory_limit from problems where problem_id=$1`,[id]);
        if(problem.rows.length===0){
            return res.status(404).json({message:`No problem found with id = ${id}`});
        }

        return res.status(200).json(problem.rows[0]);

        

    }catch(err){
        console.error(err.message);
        return res.status(500).json({message:'Server error while fetching the problem.'});
    }
}

const getProblemsByCat=async function(req,res){
    try{
        const {category}=req.params;
        const problems=await pool.query(`select problem_id,category,title,description,difficulty,time_limit,memory_limit from problems where category=$1`,[category]);
        if(problems.rows.length===0){
            return res.status(404).json({message:`No problems found in category = ${category}`});
        }
        return res.status(200).json(problems.rows);
    }catch(err){
        console.error(err.message);
        return res.status(500).json({message:'Server error while fetching problems.'})
    }
}

module.exports={getInd,logAuth,signAuth,getProblemById,getProblemsByCat};