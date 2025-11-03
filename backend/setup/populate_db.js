require('dotenv').config();
const pool = require('../db/pool');
const { problems } = require('./problemsdb/graphs_problems');
const { test_cases } = require('./problemsdb/graphs_test_cases');

async function main() {
    let client;
    
    try {
        client = await pool.connect();
        
        await client.query('BEGIN'); 

        console.log(`Populating ${problems.length} problems`);
        for (let prob of problems) {
            await client.query(`
                INSERT INTO problems (problem_id, category, title, description, difficulty, time_limit, memory_limit) 
                VALUES ($1, $2, $3, $4, $5, $6, $7);
            `, [prob.problem_id, prob.category, prob.title, prob.description, prob.difficulty, prob.time_limit, prob.memory_limit]);
        }
        
        console.log(`Populating ${test_cases.length} test cases`);
        for (let tc of test_cases) {
            await client.query(`
                INSERT INTO test_cases (problem_id, input, expected_output, is_sample) 
                VALUES ($1, $2, $3, $4);
            `, [tc.problem_id, tc.input, tc.expected_output, tc.is_sample]);
        }
        
        await client.query('COMMIT'); 
        console.log('Database successfully populated!');

    } catch (err) {
        if (client) {
            await client.query('ROLLBACK'); 
        }
        console.error('FAILED TO POPULATE DATABASE');
        console.error(err.message);
        
    } finally {
        if (client) {
            client.release();
        }
        
        await pool.end();
        console.log('--- Population script finished. ---');
    }
}

main();