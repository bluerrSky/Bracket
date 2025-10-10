const pool=require('../pool');
const {problems}=require('../problemsdb/dp_problems');
const {test_cases}=require('../problemsdb/dp_test_cases');
async function main(){
    let client;


    try{
        client=await pool.connect();
        await client.query('BEGIN');
        for (let prob of problems){
            await client.query(`
                insert into problems (problem_id,category,title,description,difficulty,time_limit,memory_limit) values ($1,$2,$3,$4,$5,$6,$7);
            `,[prob.problem_id,prob.category,prob.title,prob.description,prob.difficulty,prob.time_limit,prob.memory_limit]);
            
        }
        for(let tc of test_cases){
            await client.query(`
                insert into test_cases (problem_id,input,expected_output,is_sample) values ($1,$2,$3,$4)`,
            [tc.problem_id,tc.input,tc.expected_output,tc.is_sample]

            );
        }
        await client.query('COMMIT');    
    }catch(err){
        await client.query('ROLLBACK');
        console.error(err.message);
        
    }finally{
        client.release();
    }
    
    
}

main();