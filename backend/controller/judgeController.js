// controller/judgeController.js
const axios = require('axios');
const url = process.env.JUDGE0_URL;
const pool = require('../db/pool');

// --- 1. NEW HELPER FUNCTION ---
async function updateUserMastery(userId, problemId, verdict) {
    try {
        const probRes = await pool.query(`SELECT category FROM problems WHERE problem_id = $1`, [problemId]);
        if (probRes.rows.length === 0) return;
        const topic = probRes.rows[0].category;

        let scoreChange = 0;
        let solvedChange = 0;
        let attemptedChange = 1;

        if (verdict === 'Accepted') {
            scoreChange = 10; // +10 for correct
            solvedChange = 1;
        } else if (verdict === 'Wrong Answer') {
            scoreChange = -2; // -2 for wrong
        } else {
            scoreChange = -1; // -1 for TLE, Compile Error, etc.
        }
        
        const masterySql = `
            INSERT INTO user_topic_mastery (user_id, topic_name, mastery_score, problems_attempted, problems_solved)
            VALUES ($1, $2, $3, $4, $5)
            ON CONFLICT (user_id, topic_name)
            DO UPDATE SET
                mastery_score = user_topic_mastery.mastery_score + $3,
                problems_attempted = user_topic_mastery.problems_attempted + $4,
                problems_solved = user_topic_mastery.problems_solved + $5;
        `;
        
        await pool.query(masterySql, [userId, topic, scoreChange, attemptedChange, solvedChange]);
        console.log(`Updated mastery for user ${userId} in ${topic}.`);

    } catch (err) {
        console.error('Error updating user mastery:', err.message);
    }
}
// ------------------------------

const headers = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
}

const maxPollingTime = 60000;
const interval = 2000;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function newSub(req, res) {
    // --- 2. GET user_id ---
    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ error: "User not authenticated." });
    }
    const userId = req.user.user_id; 
    // ----------------------
    
    const { source_code, language_id, problem_id } = req.body;
    if (!source_code || !language_id || !problem_id) {
        return res.status(400).json({ error: "Missing required fields." });
    }
    const sc = Buffer.from(source_code).toString('base64');

    try {
        let testCases = await pool.query(`select input,expected_output from test_cases where problem_id=$1`, [problem_id]);
        testCases = testCases.rows;
        const limits = await pool.query(`select time_limit,memory_limit from problems where problem_id=$1`, [problem_id]);
        const { time_limit, memory_limit } = limits.rows[0];

        if (!testCases.length || !time_limit || !memory_limit) {
            return res.status(404).json({ error: 'Problem or test cases not found' });
        }
        const submissions = testCases.map(tc => {
            return {
                source_code: sc,
                language_id,
                stdin: Buffer.from(tc.input).toString('base64'),
                expected_output: Buffer.from(tc.expected_output).toString('base64'),
                cpu_time_limit: time_limit,
                memory_limit: memory_limit
            }
        });
        const response = await axios.post(`${url}/submissions/batch?base64_encoded=true&wait=false`, { submissions }, { headers });

        let tokens = response.data.map(x => x.token);
        tokens = tokens.join(',');

        let time = 0;
        let finished = false;
        let results;
        while (time < maxPollingTime) {
            const response = await axios.get(`${url}/submissions/batch?tokens=${tokens}&base64_encoded=true&fields=*`, { headers })
            results = response.data.submissions;

            finished = results.every(res => res.status.id > 2);
            if (finished) {
                break;
            }
            await sleep(interval);
            time += interval;
        }
        if (!finished) {
            console.error('Polling timed out');
            return res.status(500).json({ error: 'Submission time out!' });
        }

        const overallResults = results.map((res, index) => {
            const testCase = testCases[index];
            return {
                status: res.status.description,
                time: res.time,
                memory: res.memory,
                error: res.stderr ? Buffer.from(res.stderr, 'base64').toString() : null,
                compile_output: res.compile_output ? Buffer.from(res.compile_output, 'base64').toString() : null,
                stdout: res.stdout ? Buffer.from(res.stdout, 'base64').toString() : null,
                input: Buffer.from(testCase.input).toString(),
                expected_output: Buffer.from(testCase.expected_output).toString()
            };
        });
        
        let verdict = overallResults.every(res => res.status == 'Accepted') ? 'Accepted' : overallResults.find(res => res.status != 'Accepted').status;
        
        // --- 3. CALL THE NEW FUNCTION ---
        await updateUserMastery(userId, problem_id, verdict);
        // ---------------------------------

        res.json({ verdict, results: overallResults });

    } catch (err) {
        console.error('Server error while submitting:');
        if (err.response) {
            console.error("Error data:", err.response.data);
            console.error("Error status", err.response.status);
        } else {
            console.error(err.message);
        }
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    newSub
};