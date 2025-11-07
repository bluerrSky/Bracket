const { GoogleGenerativeAI } = require("@google/generative-ai");
const pool = require('../db/pool');
const axios = require('axios'); 
const ytsr = require('@distube/ytsr'); 
const AImodel=process.env.AI_MODEL;

const googleApiKey = process.env.GOOGLE_PSE_KEY;
const searchEngineId = process.env.GOOGLE_PSE_CX;

// --- Helper Functions (searchYouTube, searchGoogle) ... (Unchanged) ---
async function searchYouTube(searchTerm) {
    try {
        const searchResults = await ytsr(searchTerm, { pages: 1 });
        console.log(JSON.stringify(searchResults.items, null, 2));
        return searchResults.items
            .filter(item => item.type === 'video') 
            .slice(0, 3) 
            .map(item => ({
                title: item.name || 'Untitled',
                url: item.url || '',
                thumbnail: item.bestThumbnail?.url || item.thumbnails?.[0]?.url || null
            }));
    } catch (err) {
        console.error(`ytsr Error for "${searchTerm}":`, err.message);
        return []; 
    }
}

async function searchGoogle(searchTerm) {
    if (!googleApiKey || !searchEngineId) {
        console.warn("Google PSE keys are not set. Skipping article search.");
        return [];
    }
    const url = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=${searchTerm}&num=3`;
    try {
        const response = await axios.get(url);
        if (!response.data.items) {
            return [];
        }
        return response.data.items.map(item => ({
            title: item.title,
            url: item.link
        }));
    } catch (err) {
        console.error(`Google PSE Error:`, err.response ? err.response.data.error.message : err.message);
        return []; 
    }
}
// --- End Helper Functions ---


// --- getAIHint (UPDATED) ---
const getAIHint = async (req, res) => {
    const { problemId, userCode } = req.body;
    const userId = req.user?.user_id; 
    console.log(`[getAIHint] POST /get-hint for problem ${problemId} by User ${userId}`);
    
    let genAI;
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (e) {
        console.error("[getAIHint] Failed to initialize Gemini AI:", e.message);
        return res.status(500).json({ success: false, message: "AI service is misconfigured." });
    }
    
    try {
 
        const problemResult = await pool.query(
            `SELECT title, description, category FROM problems WHERE problem_id = $1`, 
            [problemId]
        );
        if (problemResult.rows.length === 0) { 
            return res.status(404).json({ success: false, message: "Problem not found." }); 
        }
        const problem = problemResult.rows[0];

        // ADAPTIVE LOGIC 
        let userContext = "User is a beginner."; 
        let submissionHistory = "None.";
        
        if (userId) {
            // 1. Get User's Mastery Score
            const masteryRes = await pool.query(
                `SELECT mastery_score FROM user_topic_mastery WHERE user_id = $1 AND topic_name = $2`,
                [userId, problem.category]
            );
            
            if (masteryRes.rows.length > 0) {
                const score = masteryRes.rows[0].mastery_score;
                // Use new tuned thresholds for context
                if (score > 40) userContext = `User is advanced (mastery ${score}).`;
                else if (score > 15) userContext = `User is intermediate (mastery ${score}).`;
                else userContext = `User is a beginner (mastery ${score}).`;
            }

            // 2. Get User's recent failed submissions for this problem
            const historyRes = await pool.query(
                `SELECT status FROM submissions 
                 WHERE user_id = $1 AND problem_id = $2 AND status != 'Accepted' 
                 ORDER BY submitted_at DESC LIMIT 3`,
                [userId, problemId]
            );

            if (historyRes.rows.length > 0) {
                submissionHistory = historyRes.rows.map(row => `Status: ${row.status}`).join('\n');
            }
        }
        console.log(`[getAIHint] 🧠 User Context: ${userContext}`);
        
        // 3. Inject context and history into the prompt
        const prompt = `
            Task: Provide a short, conceptual hint for a user stuck on a programming problem,
            tailored to their skill level and past failures.

            User Skill Level: ${userContext}

            Problem Title: ${problem.title}
            Problem Description: ${problem.description}
            
            User's Current Code:
            \`\`\`
            ${userCode}
            \`\`\`
            
            User's Previous Failed Attempts (for context):
            ${submissionHistory}

            Rules:
            - Provide a single, short, conceptual hint.
            - **Crucially**: If the user is getting a 'Time Limit Exceeded', give a hint about *optimization* or *time complexity*.
            - If the user is getting a 'Wrong Answer', hint about an *edge case* or *flawed logic*.
            - DO NOT give away the final answer or write code.
            - Keep the hint to one or two sentences.
        `;
        
        console.log("[getAIHint] Asking AI for a DYNAMIC hint...");
        const model = genAI.getGenerativeModel({ model: AImodel});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const hintText = response.text();
        
        console.log("[getAIHint] AI responded successfully.");
        
        // 4. --- APPLY "HINT COST" ---
        if (userId) {
            try {
                await pool.query(
                    `UPDATE user_topic_mastery 
                     SET mastery_score = GREATEST(0, mastery_score - 1) 
                     WHERE user_id = $1 AND topic_name = $2`,
                    [userId, problem.category]
                );
                console.log(`[getAIHint] Applied -1 hint cost to ${problem.category} for user ${userId}`);
            } catch (err) {
                console.error("Error applying hint cost:", err.message);
                // Don't block hint, just log error
            }
        }
        
        res.status(200).json({ success: true, hint: hintText });

    } catch (error) {
        console.error("Error getting AI hint:", error);
        res.status(500).json({ success: false, message: "Failed to generate a hint." });
    }
};


// --- getAIResources (Unchanged) ---
const getAIResources = async (req, res) => {
    const { problemId } = req.body;
    console.log(`[getAIResources] 🚀 POST /get-resources for problem ${problemId}`);
    
    let genAI;
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (e) {
        return res.status(500).json({ success: false, message: "AI service is misconfigured." });
    }
    
    let aiResponseText = "";
    try {
        const problemResult = await pool.query(`SELECT title, category FROM problems WHERE problem_id = $1`, [problemId]);
        if (problemResult.rows.length === 0) { 
            return res.status(404).json({ success: false, message: "Problem not found." }); 
        }
        const problem = problemResult.rows[0];
        const topic = `${problem.title} (${problem.category})`;

        const prompt = `
            Task: Identify the 2-3 most important core concepts, algorithms, or data structures needed to solve the problem "${topic}".
            Rules:
            1. Provide only the name of the concept and a one-sentence description.
            2. Your response MUST be ONLY a single valid JSON array of objects.
            3. Do not add any conversational text or markdown.
            Format:
            [
              {"concept": "Concept Name", "description": "One-sentence description."},
              {"concept": "Another Concept", "description": "Another one-sentence description."}
            ]
        `;
        
        console.log("[getAIResources] Asking AI for concepts...");
        const model = genAI.getGenerativeModel({ model: AImodel});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponseText = response.text();
        
        let jsonText = aiResponseText.trim();
        if (jsonText.startsWith("```json")) {
            const match = jsonText.match(/```json\s*([\s\S]*?)\s*```/);
            if (match && match[1]) {
                jsonText = match[1].trim();
            }
        }
        const resources = JSON.parse(jsonText);
        console.log("[getAIResources] Parsed AI concepts:", resources);
 
        console.log("[getAIResources] 🔍 Fetching real links AND videos for concepts...");

        const enhancedResources = await Promise.all(
            resources.map(async (resource) => {
                const searchTerm = `${resource.concept} algorithm tutorial`;
                const [webResult, videoResult] = await Promise.allSettled([
                    searchGoogle(searchTerm), 
                    searchYouTube(searchTerm)
                ]);

                const links = (webResult.status === 'fulfilled') ? webResult.value : [];
                const videos = (videoResult.status === 'fulfilled') ? videoResult.value : [];

                return { ...resource, links, videos };
            })
        );
        
        console.log("[getAIResources] Successfully enhanced resources with links and videos.");
        res.status(200).json({ success: true, resources: enhancedResources });

    } catch (error) {
        console.error("Error getting AI resources:", error.message);
        if (error instanceof SyntaxError) {
             console.error("RAW AI RESPONSE (Failed to parse)", aiResponseText);
             return res.status(500).json({ success: false, message: "Failed to understand AI's response." });
        }
        res.status(500).json({ success: false, message: "Failed to find resources." });
    }
};


// --- submitOnboarding (Unchanged, but good) ---
const submitOnboarding = async (req, res) => {
    const userId = req.user?.user_id;
    if (!userId) {
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }

    const assessments = req.body.assessments; 
    
    if (!assessments || !Array.isArray(assessments)) {
        return res.status(400).json({ success: false, message: "Invalid assessment data." });
    }

    // Map onboarding (Easy/Moderate) to our new tuned scores
    const scoreMap = { 'None': 0, 'Easy': 10, 'Moderate': 25, 'Hard': 45 };
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        for (const assessment of assessments) {
            const score = scoreMap[assessment.level] || 0;
            await client.query(`
                INSERT INTO user_topic_mastery (user_id, topic_name, mastery_score)
                VALUES ($1, $2, $3)
                ON CONFLICT (user_id, topic_name)
                DO UPDATE SET mastery_score = $3
            `, [userId, assessment.topic, score]);
        }
        await client.query('COMMIT');
        console.log("[submitOnboarding] Mastery scores saved. Forwarding to generate path...");
        
        return generateLearningPath(req, res); // Call the path generator
        
    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error('[submitOnboarding] Error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to save assessment.' });
    } finally {
        if (client) client.release();
    }
};


// --- submitTutorialFeedback (Unchanged, but good) ---
const submitTutorialFeedback = async (req, res) => {
    const userId = req.user?.user_id;
    if (!userId) {
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }
    const { topic_name, rating, confused_subtopic } = req.body;
    let client;
    let aiResponseText = ""; 

    try {
        client = await pool.connect();
        await client.query(`
            INSERT INTO user_tutorial_progress (user_id, topic_name, status, satisfaction_rating)
            VALUES ($1, $2, 'Completed', $3)
            ON CONFLICT (user_id, topic_name)
            DO UPDATE SET status = 'Completed', satisfaction_rating = $3
        `, [userId, topic_name, rating]);

        if (rating > 3) { 
            const problemsRes = await pool.query(
                `SELECT problem_id, title, difficulty FROM problems WHERE category = $1 AND difficulty = 'Easy' LIMIT 3`, 
                [topic_name]
            );
            return res.status(200).json({ 
                success: true, 
                message: "Great! Here are some problems to practice.",
                explanation: null,
                problems: problemsRes.rows 
            });
        }

        let genAI;
        try {
            genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        } catch (e) {
            return res.status(500).json({ success: false, message: "AI service is misconfigured." });
        }

        const allProbsRes = await pool.query(
            `SELECT problem_id, title, description FROM problems WHERE category = $1`, 
            [topic_name]
        );
        
        const prompt = `
            Task: You are a JSON-only API. A user is confused about a subtopic.
            1. Provide a clear, concise explanation of the subtopic.
            2. Recommend 2-3 problem_ids from the provided list that are perfect for practicing that specific subtopic.
            
            USER DATA:
            {
                "topic": "${topic_name}",
                "confused_subtopic": "${confused_subtopic}",
                "available_problems": ${JSON.stringify(allProbsRes.rows)}
            }
            
            RESPONSE FORMAT:
            You must return *only* a single valid JSON object.
            {
              "explanation": "Your clear, concise explanation here...",
              "problem_ids": [101, 102]
            }
        `;

        const model = genAI.getGenerativeModel({ model: AImodel});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponseText = response.text();

        let jsonText = aiResponseText;
        if (jsonText.startsWith("```json")) {
            jsonText = jsonText.match(/```json\s*([\s\S]*?)\s*```/)[1];
        }
        const remediation = JSON.parse(jsonText);

        const problemsRes = await pool.query(
            `SELECT problem_id, title, difficulty FROM problems WHERE problem_id = ANY($1::int[])`,
            [remediation.problem_ids]
        );

        res.status(200).json({
            success: true,
            message: "Here's some extra help on that topic!",
            explanation: remediation.explanation,
            problems: problemsRes.rows
        });

    } catch (err) {
        console.error('[submitTutorialFeedback] Error:', err.message);
        if (err instanceof SyntaxError) {
             console.error("RAW AI RESPONSE (Failed to parse)", aiResponseText);
             return res.status(500).json({ success: false, message: "Failed to understand AI's response." });
        }
        res.status(500).json({ success: false, message: 'Failed to get remediation.' });
    } finally {
        if (client) client.release();
    }
};


// --- generateLearningPath (FULLY REFACTORED) ---
const generateLearningPath = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[generateLearningPath] POST /generate-path for User ${userId}`);
    if (!userId) {
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }

    let genAI;
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (e) {
        return res.status(500).json({ success: false, message: "AI service is misconfigured." });
    }

    let aiResponseText = "";
    try {
        console.log("[generateLearningPath] fetching user data and prereqs...");
        
        // 1. Fetch all data
        const masteryRes = await pool.query(
            `SELECT topic_name, mastery_score FROM user_topic_mastery WHERE user_id = $1`,
            [userId]
        );
        const prereqRes = await pool.query(`SELECT * FROM topic_prerequisites`);

        // 2. Process data for prompt and logic
        const userMasteryMap = new Map(masteryRes.rows.map(r => [r.topic_name, r.mastery_score]));
        const prereqMap = new Map();
        prereqRes.rows.forEach(r => {
            if (!prereqMap.has(r.topic_id)) {
                prereqMap.set(r.topic_id, []);
            }
            prereqMap.get(r.topic_id).push(r.prerequisite_id);
        });

        // 3. Create the simplified prompt with NEW thresholds
        const prompt = `
            You are an expert Computer Science tutor. A user's knowledge is represented by a "mastery_score".
            - A score of 0-15 means "Beginner".
            - A score of 16-40 means "Intermediate".
            - A score over 40 means "Mastered".
            
            Based on this, identify the top 3-5 topics the user should focus on *next*.
            
            - Prioritize topics where the user is a "Beginner" (score <= 15).
            - Only recommend topics if their prerequisites have been at least "Intermediate" (score > 15).
            - Return *only* a valid JSON array of strings, with no other text.
            
            EXAMPLE: ["Arrays", "Recursion", "Trees"]

            DATA:
            {
                "userMastery": ${JSON.stringify(masteryRes.rows)},
                "prerequisites": ${JSON.stringify(prereqRes.rows)}
            }
        `;
        
        console.log("[generateLearningPath] Asking AI for *next recommended topics*...");
        const model = genAI.getGenerativeModel({ model: AImodel});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponseText = response.text();

        // 4. Parse AI response (a simple array of strings)
        let jsonText = aiResponseText.trim().replace(/```json/g, "").replace(/```/g, "");
        const recommendedTopics = JSON.parse(jsonText); 
        console.log("[generateLearningPath] Parsed AI recommendations:", recommendedTopics);

        if (!Array.isArray(recommendedTopics) || recommendedTopics.length === 0) {
            return res.status(400).json({ success: false, message: "AI did not generate a valid path." });
        }
        
        // 5. --- "CODE AS VALIDATOR" LOGIC ---
        const finalPath = [];
        const problemIds = [];

        for (const topic of recommendedTopics) {
            // 5a. Check prerequisites in code
            const prereqs = prereqMap.get(topic) || [];
            const prereqMasteryThreshold = 15; // Prereqs must be > 15
            
            const prereqsMet = prereqs.every(prereqTopic => 
                (userMasteryMap.get(prereqTopic) || 0) > prereqMasteryThreshold
            );

            if (!prereqsMet) {
                console.warn(`[generateLearningPath] Skipping topic "${topic}" (prerequisites not met).`);
                continue; 
            }

            // 5b. Determine difficulty in code (using tuned thresholds)
            const score = userMasteryMap.get(topic) || 0;
            let difficulty;
            if (score <= 15) difficulty = 'Easy';        // Range 0-15
            else if (score <= 40) difficulty = 'Medium'; // Range 16-40
            else difficulty = 'Hard';                    // Range 41+

            finalPath.push({ topic, difficulty });

            // 5c. Fetch 2 problems for this valid topic + difficulty
            const problemsRes = await pool.query(
                `SELECT p.problem_id 
                 FROM problems p
                 LEFT JOIN user_problem up ON p.problem_id = up.problem_id AND up.user_id = $3
                 WHERE p.category = $1 
                   AND p.difficulty = $2
                   AND (up.solved IS NULL OR up.solved = FALSE)
                 ORDER BY p.problem_id 
                 LIMIT 2`, 
                [topic, difficulty, userId]
            );
            
            problemIds.push(...problemsRes.rows.map(r => r.problem_id));
        }
        // --- END OF NEW LOGIC ---

        console.log(`[generateLearningPath] Collected ${problemIds.length} total problems for path.`);

        // 6. Save the new path to the database
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            await client.query(`DELETE FROM user_learning_path WHERE user_id = $1`, [userId]);
            for (let i = 0; i < problemIds.length; i++) {
                await client.query(
                    `INSERT INTO user_learning_path (user_id, problem_id, order_index) VALUES ($1, $2, $3)`,
                    [userId, problemIds[i], i]
                );
            }
            await client.query("COMMIT");
            console.log("[generateLearningPath] Saved new focused path to DB.");
        } catch (e) {
            await client.query("ROLLBACK");
            throw e;
        } finally {
            client.release();
        }

        // 7. Return the full path
        const pathRes = await pool.query(
            `SELECT p.problem_id, p.title, p.category, p.difficulty, ulp.status
             FROM user_learning_path ulp
             JOIN problems p ON ulp.problem_id = p.problem_id
             WHERE ulp.user_id = $1
             ORDER BY ulp.order_index ASC`,
            [userId]
        );

        console.log(`[generateLearningPath] Returning complete path with ${pathRes.rows.length} problems.`);
        res.status(200).json({
            success: true,
            message: "A new learning path has been generated!",
            learning_path: finalPath, // The high-level topic path
            problems: pathRes.rows   // The specific problems for the path
        });

    } catch (error) {
        console.error("Error generating full learning path:", error.message);
        if (error instanceof SyntaxError) {
            console.error("RAW AI RESPONSE (Failed to parse)", aiResponseText);
            return res.status(500).json({ success: false, message: "Failed to parse AI response." });
        }
        res.status(500).json({ success: false, message: "Failed to generate full learning path." });
    }
};

// --- getLearningPath (Unchanged) ---
const getLearningPath = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[getLearningPath] GET /get-path for User ${userId}`);
    if (!userId) {
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }
    
    try {
        const pathRes = await pool.query(
            `SELECT p.problem_id, p.title, p.category, p.difficulty, ulp.status
             FROM user_learning_path ulp
             JOIN problems p ON ulp.problem_id = p.problem_id
             WHERE ulp.user_id = $1
             ORDER BY ulp.order_index ASC`,
            [userId]
        );
        console.log(`[getLearningPath] Found ${pathRes.rows.length} items in path.`);
        res.status(200).json(pathRes.rows);
    } catch (err) {
        console.error(`[getLearningPath] Error:`, err.message);
        res.status(500).json({ message: 'Server error while fetching learning path.' });
    }
};


module.exports = {
    getAIHint,
    getAIResources,
    generateLearningPath,
    getLearningPath,
    submitOnboarding,
    submitTutorialFeedback
};