const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
const pool = require('../db/pool');
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google AI client with your API key from the .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

function getInd(req, res) {
    res.status(200).json({
        message: 'Hi',
        status: 'success'
    });
}

const logAuth = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ success: false, message: info.message });
        }
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Login failed' });
            }
            return res.status(200).json({ success: true, user, message: 'Login successful' });
        });
    })(req, res, next);
};

const signAuth = async function (req, res) {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 12);
        const { rows } = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id, username, email;',
            [req.body.username, req.body.email, hashPass]
        );
        const user = rows[0];
        req.login(user, (err) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Sign up successful, but Login failed' });
            }
            return res.status(200).json({ success: true, user, message: 'Sign up and Login successful' });
        });
    } catch (err) {
        console.error(err.message);
        if (err.code === '23505') {
            return res.status(409).json({ success: false, message: 'Username or Email already exists' });
        }
        return res.status(500).json({ success: false, message: 'Server error!' });
    }
};

const checkAuth = function (req, res) {
    if (req.isAuthenticated()) {
        return res.status(200).json({ success: true, user: req.user });
    } else {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
};

const getAIHint = async (req, res) => {
    const { problemId, userCode } = req.body;

    try {
        const problemResult = await pool.query(
            `SELECT title, description FROM problems WHERE problem_id = $1`,
            [problemId]
        );

        if (problemResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Problem not found." });
        }
        const problem = problemResult.rows[0];

const prompt = `
            You are an expert programming tutor for a competitive programming platform.
            A user is stuck on the following problem and needs a hint.

            **Problem Title:** ${problem.title}
            **Problem Description:** ${problem.description}

            **Here is the user's current code:**
            \`\`\`
            ${userCode}
            \`\`\`

            Your task is to provide a single, short, conceptual hint.
            - **The entire hint must be generated using Markdown formatting** so it can be rendered by React Markdown.
            - Use standard Markdown (e.g., \`code\`, **bold**). Use GitHub-flavored Markdown for code blocks (e.g., \`\`\`cpp\`).
            - Use LaTeX enclosed in **single dollar signs ($...$)** for inline math and **double dollar signs ($$...$$)** for block math.
            - DO NOT give away the final answer or write any complete code blocks.
            - DO NOT point out specific syntax errors.
            - Guide them toward the correct algorithm or data structure.
            - Suggest an edge case they might be missing.
            - Keep the hint to one or two sentences.
            
        `;

        // Use the stable alias for the latest Flash model
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const hintText = response.text();
        console.log(hintText);
        res.status(200).json({ success: true, hint: hintText });

    } catch (error) {
        console.error("Error getting AI hint:", error);
        res.status(500).json({ success: false, message: "Failed to generate a hint." });
    }
};

const getAIResources = async (req, res) => {
    const { problemId } = req.body;

    try {
        // 1. Fetch the problem's title and category from your database
        const problemResult = await pool.query(
            `SELECT title, category FROM problems WHERE problem_id = $1`,
            [problemId]
        );

        if (problemResult.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Problem not found." });
        }
        const problem = problemResult.rows[0];
        const topic = `${problem.title} (${problem.category})`; // e.g., "Two Sum (Arrays)"

        // 2. Construct a specialized prompt for the AI
        const prompt = `
            You are an expert programming tutor. A user is working on a problem called "${topic}".
            Find 2-3 high-quality, real, and publicly accessible online resources (like articles from GeeksforGeeks, freeCodeCamp, or videos from popular educational YouTube channels) that would help someone understand the core concepts needed to solve this problem.

            For each resource, provide its title, a direct URL, and a one-sentence description.
            VERY IMPORTANT: Your final output must be only a valid JSON array of objects, with no other text, like this:
            [
              {
                "title": "Resource Title Here",
                "url": "https://example.com/article-url",
                "description": "This article explains the core concept of..."
              },
              {
                "title": "Another Resource Title",
                "url": "https://youtube.com/watch?v=some-video",
                "description": "This video provides a visual walkthrough of the algorithm."
              }
            ]
        `;

        // 3. Call the Gemini API
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const jsonText = response.text();

        // 4. Parse the AI's JSON response and send it to the frontend
        const resources = JSON.parse(jsonText);
        res.status(200).json({ success: true, resources });

    } catch (error) {
        console.error("Error getting AI resources:", error);
        res.status(500).json({ success: false, message: "Failed to find resources." });
    }
};

const getProblemById = async function (req, res) {
    try {
        const { id } = req.params;
        const problem = await pool.query(`SELECT problem_id, category, title, description, difficulty, time_limit, memory_limit FROM problems WHERE problem_id=$1`, [id]);
        if (problem.rows.length === 0) {
            return res.status(404).json({ message: `No problem found with id = ${id}` });
        }
        return res.status(200).json(problem.rows[0]);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error while fetching the problem.' });
    }
};

const getProblemsByCat = async function (req, res) {
    try {
        const { category } = req.params;
        const problems = await pool.query(`SELECT problem_id, category, title, description, difficulty, time_limit, memory_limit FROM problems WHERE category=$1`, [category]);
        if (problems.rows.length === 0) {
            return res.status(404).json({ message: `No problems found in category = ${category}` });
        }
        return res.status(200).json(problems.rows);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: 'Server error while fetching problems.' });
    }
};

module.exports = {
    getInd,
    logAuth,
    signAuth,
    checkAuth,
    getAIHint,
    getAIResources,
    getProblemById,
    getProblemsByCat,
};