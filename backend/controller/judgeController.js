const axios=require('axios');
const url =process.env.judgeUrl;
const pool=require('../db/pool');


async function analyseToken(token){
    const count=60;
    let result=null;
    while(count--){
        try{
            const response=await axios.get(`${url}/${token}?base64_encoded=true`);
            const status=response.data.status;
            if(status.id>=3){
                result=response.data;
                break;
            }

        }catch(err){
            console.error(err.message);
            result={error:'Failed to get submision status'};
            break;  

        }
       
        await new Promise((resolve,reject)=>{
            setTimeout(()=>{
                resolve();
            },1000);
        });
    }
    if(!result){
        result={error:'Submission timed out!'};
        
    }
    return result;
}

async function newSub(req,res){
    const {source_code,language_id,problem_id}=req.body;
    const sc=Buffer.from(source_code).toString('base64');
    

    try{
        let testCases=await pool.query(`select input,expected_output from test_cases where problem_id=$1`,[problem_id]);
        testCases=testCases.rows;
        const limits=await pool.query(`select time_limit,memory_limit from problems where problem_id=$1`,[problem_id]);
        const {time_limit,memory_limit}=limits.rows[0];

        if(!testCases.length || !time_limit){
            return res.status(404).json({error:'Problem or test cases not found'});
        }
        const submissions=testCases.map(tc=>{
            return {
            sc,
            language_id,
            stdin:Buffer.from(tc.input).toString('base64'),
            expected_output:Buffer.from(tc.expected_output).toString('base64'),
            cpu_time_limit:time_limit,
            memory_limit:memory_limit

        }});
        const response=await axios.post(`${url}/batch?base64_encoded=true&wait=false`,{submissions});

        const tokens=response.data.map(x=>x.token);

        const resPromises=tokens.map(token=>analyseToken(token));
        const results= await Promise.all(resPromises);

        const overallResults=results.map(res=>{
            return {
                status:res.status.description,
                time:res.time,
                memory:res.memory,
                error:res.stderr?Buffer.from(res.stderr,'base64').toString():null,
                compile_output:res.compile_output?Buffer.from(res.compile_output,'base64').toString():null,
                stdout:res.stdout?Buffer.from(res.stdout,'base64').toString():null
            };

        });
        let verdict=overallResults.every(res=>res.status=='Accepted')?'Accepted':overallResults.find(res=>res.status!='Accepted').status;
        res.json({verdict,results:overallResults});

    }catch(err){
        
        console.error(`Server error while submitting:${err.response?err.response:err.message}`);
        res.status(500).json({error:'Server error'});
    }
}

// async function getStatus(req,res){
//     const {token}=req.params;
//     try{

//         const response=await axios.get(`${url}/${token}?base64_encoded=true`);
//         const status=response.data.status;
//         const error=response.data.stderr?Buffer.from(response.data.stderr,'base64').toString():null;
//         const compile_output=response.data.compile_output?Buffer.from(response.data.compile_output,'base64').toString():null;
//         res.json({status,error,compile_output});
//     }catch(err){
//         console.error("Couldn't fetch submission status:",err.response?err.response:err.message);
//         res.status(500).json({error:"Couldn't fetch submission status"});

//     }


// }

module.exports={
    newSub,
    // getStatus
};
