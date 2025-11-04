const axios = require('axios');
const url = process.env.JUDGE0_URL;
const pool = require('../db/pool');

// --- HELPER 1: User Topic Mastery (UPDATED) ---
async function updateUserMastery(client, userId, problemId, verdict) {
    try {
        // 1. Fetch category AND difficulty
        const probRes = await client.query(
            `SELECT category, difficulty FROM problems WHERE problem_id = $1`, 
            [problemId]
        );
        if (probRes.rows.length === 0) return;
        
        const { category, difficulty } = probRes.rows[0];

        // 2. Tuned score changes
        let scoreChange = 0;
        let solvedChange = 0;
        let attemptedChange = 1;

        if (verdict === 'Accepted') {
            // Tuned for a smaller problem bank
            if (difficulty === 'Easy') scoreChange = 8;
            else if (difficulty === 'Medium') scoreChange = 10;
            else if (difficulty === 'Hard') scoreChange = 15;
            
            solvedChange = 1;
        } else if (verdict === 'Wrong Answer') {
            scoreChange = -2; // Small penalty
        } else {
            scoreChange = -1; // e.g., Compile Error
        }
        
        const masterySql = `
            INSERT INTO user_topic_mastery (user_id, topic_name, mastery_score, problems_attempted, problems_solved)
            VALUES ($1, $2, $3, $4, $5) ON CONFLICT (user_id, topic_name) DO UPDATE SET
                mastery_score = GREATEST(0, user_topic_mastery.mastery_score + $3), -- Prevents negative score
                problems_attempted = user_topic_mastery.problems_attempted + $4,
                problems_solved = user_topic_mastery.problems_solved + $5;
        `;
        await client.query(masterySql, [userId, category, scoreChange, attemptedChange, solvedChange]);

    } catch (err) {
        console.error('Error updating user mastery:', err.message);
        throw err; // Propagate error to rollback transaction
    }
}

// --- HELPER 2: Log the Submission (Unchanged) ---
async function logSubmission(client, { userId, problem_id, language_id, source_code, verdict, token }) {
    try {
        const sql = `
            INSERT INTO submissions (user_id, problem_id, language_id, source_code, submitted_at, status, token)
            VALUES ($1, $2, $3, $4, NOW(), $5, $6);
        `;
        await client.query(sql, [userId, problem_id, language_id, source_code, verdict, token]);
    } catch (err) {
        console.error('Error logging submission:', err.message);
        throw err;
    }
}

// --- HELPER 3: Update User Problem Status (Unchanged) ---
async function updateUserProblemStatus(client, userId, problemId, verdict) {
    try {
        const isSolved = verdict === 'Accepted';
        const sql = `
            INSERT INTO user_problem (user_id, problem_id, attempted, solved)
            VALUES ($1, $2, TRUE, $3)
            ON CONFLICT (user_id, problem_id)
            DO UPDATE SET
                attempted = TRUE,
                solved = user_problem.solved OR $3;
        `;
        await client.query(sql, [userId, problemId, isSolved]);
    } catch (err) {
        console.error('Error updating user_problem status:', err.message);
        throw err;
    }
}

// --- HELPER 4: Update Learning Path (Unchanged) ---
async function updateLearningPathStatus(client, userId, problemId, verdict) {
    try {
        if (verdict === 'Accepted') {
            const sql = `
                UPDATE user_learning_path
                SET status = 'Solved'
                WHERE user_id = $1 AND problem_id = $2;
            `;
            await client.query(sql, [userId, problemId]);
        }
    } catch (err) {
        console.error('Error updating learning path:', err.message);
        throw err;
    }
}


// --- Main newSub Function (Unchanged) ---
const headers = {
    'content-type': 'application/json',
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
    'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
};
const maxPollingTime = 60000;
const interval = 2000;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function newSub(req, res) {
    if (!req.user || !req.user.user_id) {
        return res.status(401).json({ error: "User not authenticated." });
    }
    const userId = req.user.user_id; 
    
    const { source_code, language_id, problem_id } = req.body;
    if (!source_code || !language_id || !problem_id) {
        return res.status(400).json({ error: "Missing required fields." });
    }
    const sc = Buffer.from(source_code).toString('base64');
    
    let client;

    try {
        const testCasesRes = await pool.query(`select input,expected_output from test_cases where problem_id=$1`, [problem_id]);
        const testCases = testCasesRes.rows;
        
        const limitsRes = await pool.query(`select time_limit,memory_limit from problems where problem_id=$1`, [problem_id]);
        const { time_limit, memory_limit } = limitsRes.rows[0];

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
            const pollResponse = await axios.get(`${url}/submissions/batch?tokens=${tokens}&base64_encoded=true&fields=*`, { headers });
            results = pollResponse.data.submissions;

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
                input: (testCase.input).toString(),
                expected_output: (testCase.expected_output).toString()
            };
        });
        
        const verdict = overallResults.every(res => res.status == 'Accepted') ? 'Accepted' : overallResults.find(res => res.status != 'Accepted').status;
        
        client = await pool.connect();
        try {
            await client.query('BEGIN');
            // --- ALL HELPERS ARE CALLED HERE ---
            await updateUserMastery(client, userId, problem_id, verdict);
            await logSubmission(client, { userId, problem_id, language_id, source_code, verdict, token: tokens.split(',')[0] });
            await updateUserProblemStatus(client, userId, problem_id, verdict);
            await updateLearningPathStatus(client, userId, problem_id, verdict);
            await client.query('COMMIT');
            console.log(`[Submission Success] All DB updates for user ${userId} on problem ${problem_id} committed.`);
        } catch (dbErr) {
            await client.query('ROLLBACK');
            console.error('[Submission DB Error] Transaction rolled back.', dbErr.message);
        } finally {
            client.release();
        }
        
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