const pool = require('../db/pool');
const fs = require('fs');
const path = require('path');


async function loadProblemFiles() {
    const problemsDir = path.join(__dirname, 'problemsdb');
    const files = fs.readdirSync(problemsDir);

    let allProblems = [];
    let allTestCases = [];

    
    const categories = {};

    for (const file of files) {
        const match = file.match(/^(.+?)_(problems|test_cases)\.js$/);
        if (match) {
            const [ , category, type ] = match;
            if (!categories[category]) categories[category] = {};
            categories[category][type] = file;
        }
    }

    for (const [category, files] of Object.entries(categories)) {
        console.log(`\nLoading category: ${category}`);

        if (files.problems) {
            const { problems } = require(path.join(problemsDir, files.problems));
            
            allProblems = allProblems.concat(problems);
        }

        if (files.test_cases) {
            const { test_cases } = require(path.join(problemsDir, files.test_cases));
            
            allTestCases = allTestCases.concat(test_cases);
        }
    }

    

    return { allProblems, allTestCases };
}

async function main() {
    let client;
    
    try {

        const { allProblems: problems, allTestCases: test_cases } = await loadProblemFiles();

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