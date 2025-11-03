const axios = require('axios');
const url = process.env.JUDGE0_URL;
const pool = require('../db/pool');

// --- HELPER 1: User Topic Mastery (Your existing function - no changes) ---
async function updateUserMastery(client, userId, problemId, verdict) {
    // ... (Your existing code is perfect here, just add 'client' as a parameter)
    // IMPORTANT: Replace all `pool.query` inside this function with `client.query`
    try {
        const probRes = await client.query(`SELECT category FROM problems WHERE problem_id = $1`, [problemId]);
        if (probRes.rows.length === 0) return;
        const topic = probRes.rows[0].category;

        let scoreChange = 0;
        let solvedChange = 0;
        let attemptedChange = 1;

        if (verdict === 'Accepted') {
            scoreChange = 10;
            solvedChange = 1;
        } else if (verdict === 'Wrong Answer') {
            scoreChange = -2;
        } else {
            scoreChange = -1;
        }
        
        const masterySql = `
            INSERT INTO user_topic_mastery (user_id, topic_name, mastery_score, problems_attempted, problems_solved)
            VALUES ($1, $2, $3, $4, $5) ON CONFLICT (user_id, topic_name) DO UPDATE SET
                mastery_score = user_topic_mastery.mastery_score + $3,
                problems_attempted = user_topic_mastery.problems_attempted + $4,
                problems_solved = user_topic_mastery.problems_solved + $5;
        `;
        await client.query(masterySql, [userId, topic, scoreChange, attemptedChange, solvedChange]);
    } catch (err) {
        console.error('Error updating user mastery:', err.message);
        throw err; // Propagate error to rollback transaction
    }
}

// --- HELPER 2: Log the Submission (New) ---
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

// --- HELPER 3: Update User Problem Status (New) ---
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
        // `solved OR $3` ensures that once a problem is solved, it stays solved.
        await client.query(sql, [userId, problemId, isSolved]);
    } catch (err) {
        console.error('Error updating user_problem status:', err.message);
        throw err;
    }
}

// --- HELPER 4: Update Learning Path (New) ---
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


const headers = { /* ... your existing headers ... */ };
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
    
    let client; // Define client here to use in the finally block

    try {
        // --- All your existing logic to get test cases, limits, and poll Judge0 ---
        // ... (no changes needed in this section) ...
        const testCases = await pool.query(`select input,expected_output from test_cases where problem_id=$1`, [problem_id]);
        // ...
        const response = await axios.post(`${url}/submissions/batch?base64_encoded=true&wait=false`, { submissions }, { headers });
        let tokens = response.data.map(x => x.token);
        // ... (your while loop for polling) ...
        
        if (!finished) { /* ... handle timeout ... */ }
        
        const overallResults = results.map(/* ... your mapping logic ... */);
        const verdict = overallResults.every(res => res.status == 'Accepted') ? 'Accepted' : overallResults.find(res => res.status != 'Accepted').status;
        
        // --- DATABASE TRANSACTION ---
        // Use a transaction to ensure all updates succeed or none do.
        client = await pool.connect();
        try {
            await client.query('BEGIN');

            // --- CALL ALL HELPERS ---
            await updateUserMastery(client, userId, problem_id, verdict);
            await logSubmission(client, { userId, problem_id, language_id, source_code, verdict, token: tokens.split(',')[0] });
            await updateUserProblemStatus(client, userId, problem_id, verdict);
            await updateLearningPathStatus(client, userId, problem_id, verdict);
            
            await client.query('COMMIT');
            console.log(`[Submission Success] All DB updates for user ${userId} on problem ${problem_id} committed.`);

        } catch (dbErr) {
            await client.query('ROLLBACK');
            console.error('[Submission DB Error] Transaction rolled back.', dbErr.message);
            // We still want to send results to the user, but we log the internal error.
            // You might want to return a specific error to the user here instead.
        } finally {
            client.release();
        }
        // --- END TRANSACTION ---

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