const axios = require('axios');
const pool = require('../db/pool');
require('dotenv').config();

// A helper map to convert Judge0 status IDs to human-readable verdicts.
const verdictMap = {
    1: "In Queue",
    2: "Processing",
    3: "Accepted",
    4: "Wrong Answer",
    5: "Time Limit Exceeded",
    6: "Compilation Error",
    7: "Runtime Error (SIGSEGV)",
    8: "Runtime Error (SIGXFSZ)",
    9: "Runtime Error (SIGFPE)",
    10: "Runtime Error (SIGABRT)",
    11: "Runtime Error (NZEC)",
    12: "Runtime Error (Other)",
    13: "Internal Error",
    14: "Exec Format Error"
};


/**
 * A helper function to add a delay.
 * @param {number} ms - The number of milliseconds to wait.
 * @returns {Promise} A promise that resolves after the specified delay.
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/**
 * Handles a new code submission.
 * - Fetches test cases from the database.
 * - Submits the code and test cases to Judge0 in a batch.
 * - Polls Judge0 for the results.
 * - Determines the final verdict.
 * - Saves the submission to the database.
 * - Sends the final verdict back to the client.
 */
const newSub = async (req, res) => {
    // --- Environment Variable Validation ---
    const { JUDGE0_URL, RAPIDAPI_KEY, RAPIDAPI_HOST } = process.env;
    if (!JUDGE0_URL || !RAPIDAPI_KEY || !RAPIDAPI_HOST) {
        console.error("Missing required environment variables for Judge0 API.");
        return res.status(500).json({ error: "Server configuration error: Missing API credentials for code execution service." });
    }

    const { source_code, language_id, problem_id } = req.body;
    
    // In a real application, you would get the user_id from the authenticated session.
    // const user_id = req.user.id; 
    const user_id = 1; // Placeholder user_id

    if (!source_code || !language_id || !problem_id) {
        return res.status(400).json({ error: 'Missing required fields: source_code, language_id, problem_id' });
    }

    try {
        // 1. Fetch all test cases for the given problem from your database.
        const testCasesResult = await pool.query('SELECT input, expected_output FROM test_cases WHERE problem_id = $1', [problem_id]);
        const testCases = testCasesResult.rows;

        if (testCases.length === 0) {
            return res.status(404).json({ error: 'Test cases for the specified problem not found.' });
        }

        // 2. Prepare the submission data for Judge0's batch submission endpoint.
        const submissions = testCases.map(tc => ({
            language_id,
            source_code,
            stdin: tc.input,
            expected_output: tc.expected_output,
        }));
        
        // 3. Post the batch submission to Judge0.
        const judge0PostOptions = {
            method: 'POST',
            url: `${JUDGE0_URL}/submissions/batch`,
            params: { base64_encoded: 'false', wait: 'false' },
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': RAPIDAPI_KEY,
                'X-RapidAPI-Host': RAPIDAPI_HOST
            },
            data: { submissions }
        };
        
        const postResponse = await axios.request(judge0PostOptions);
        const tokens = postResponse.data.map(s => s.token);
        const tokenString = tokens.join(',');

        // 4. Poll Judge0 for the results using the submission tokens.
        let results;
        while (true) {
            const judge0GetOptions = {
                method: 'GET',
                url: `${JUDGE0_URL}/submissions/batch`,
                params: { tokens: tokenString, base64_encoded: 'false', fields: 'status_id,time,memory' },
                headers: {
                    'X-RapidAPI-Key': RAPIDAPI_KEY,
                    'X-RapidAPI-Host': RAPIDAPI_HOST
                }
            };

            const getResponse = await axios.request(judge0GetOptions);
            const submissionsResults = getResponse.data.submissions;

            // Check if all submissions have finished processing (status > 2).
            const allFinished = submissionsResults.every(result => result.status_id > 2);
            if (allFinished) {
                results = submissionsResults;
                break;
            }

            await sleep(2000); // Wait for 2 seconds before polling again.
        }

        // 5. Determine the final verdict.
        let finalVerdict = "Accepted";
        let totalTime = 0;
        let maxMemory = 0;

        for (const result of results) {
            totalTime += parseFloat(result.time || 0);
            maxMemory = Math.max(maxMemory, result.memory || 0);

            if (result.status_id !== 3) { // 3 is the ID for "Accepted".
                finalVerdict = verdictMap[result.status_id] || "Error";
                break; // Stop checking on the first failed test case.
            }
        }
        
        // 6. Save the submission result to your database.
        await pool.query(
            `INSERT INTO submissions (user_id, problem_id, language_id, source_code, sumitted_at, status, execution_time, execution_memory)
             VALUES ($1, $2, $3, $4, NOW(), $5, $6, $7)`,
            [user_id, problem_id, language_id, source_code, finalVerdict, totalTime / results.length, maxMemory]
        );

        // 7. Send the final verdict back to the client.
        res.status(200).json({ verdict: finalVerdict, details: results });

    } catch (error) {
        console.error("Error during submission:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'An error occurred while processing your submission.' });
    }
};

module.exports = { newSub };

