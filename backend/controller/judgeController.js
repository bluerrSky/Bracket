const axios=require('axios');
const url =process.env.JUDGE0_URL;
const pool=require('../db/pool');


const headers={
    'content-type': 'application/json',
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
}

const maxPollingTime=60000;
const interval=2000;
const sleep=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));

async function newSub(req,res){
    const {source_code,language_id,problem_id}=req.body;
    if(!source_code || ! language_id || !problem_id){
        return res.status(400).json({error:"Missing required fields."});
    }
    const sc=Buffer.from(source_code).toString('base64');

    try{
        let testCases=await pool.query(`select input,expected_output from test_cases where problem_id=$1`,[problem_id]);
        testCases=testCases.rows;
        const limits=await pool.query(`select time_limit,memory_limit from problems where problem_id=$1`,[problem_id]);
        const {time_limit,memory_limit}=limits.rows[0];

        if(!testCases.length || !time_limit || !memory_limit){
            return res.status(404).json({error:'Problem or test cases not found'});
        }
        const submissions=testCases.map(tc=>{
            return {
            source_code:sc,
            language_id,
            stdin:Buffer.from(tc.input).toString('base64'),
            expected_output:Buffer.from(tc.expected_output).toString('base64'),
            cpu_time_limit:time_limit,
            memory_limit:memory_limit

        }});
        const response=await axios.post(`${url}/submissions/batch?base64_encoded=true&wait=false`,{submissions},{headers});

        let tokens=response.data.map(x=>x.token);
        tokens=tokens.join(',');

        let time=0;
        let finished=false;
        let results;
        while(time<maxPollingTime){
            const response=await axios.get(`${url}/submissions/batch?tokens=${tokens}&base64_encoded=true&fields=*`,{headers})
            results=response.data.submissions;

            finished=results.every(res=> res.status.id>2);
            if(finished){
                break;
            }
            await sleep(interval);
            time+=interval;
        }
        if(!finished){
            console.error('Polling timed out');
            return res.status(500).json({error:'Submission time out!'});
        }

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
        
        console.error('Server error while submitting:');
        if(err.response){
            console.error("Error data:",err.response.data);
            console.error("Error status",err.response.status);
        }else{
            console.error(err.message);
        }
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