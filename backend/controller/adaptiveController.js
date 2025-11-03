const { GoogleGenerativeAI } = require("@google/generative-ai");
const pool = require('../db/pool');
const axios = require('axios'); 
const ytsr = require('@distube/ytsr'); 
const AImodel=process.env.AI_MODEL;

const googleApiKey = process.env.GOOGLE_PSE_KEY;
const searchEngineId = process.env.GOOGLE_PSE_CX;


/**
 * Searches YouTube 
 * @param {string} searchTerm 
 * @returns {Promise<Array>} 
 */
async function searchYouTube(searchTerm) {
    try {
        
        const searchResults = await ytsr(searchTerm, { pages: 1 });
        
       
        return searchResults.items
            .filter(item => item.type === 'video') 
            .slice(0, 3) 
            .map(item => ({
                title: item.title || 'Untitled',
                url: item.url || '',
                thumbnail: item.bestThumbnail?.url || item.thumbnails?.[0]?.url || null
            }));
    } catch (err) {
        console.error(`ytsr Error for "${searchTerm}":`, err.message);
        return []; 
    }
}


/**
 * Searches Google 
 * @param {string} searchTerm 
 * @returns {Promise<Array>} 
 */
async function searchGoogle(searchTerm) {
    if (!googleApiKey || !searchEngineId) {
        console.warn("Google PSE keys (GOOGLE_PSE_KEY, GOOGLE_PSE_CX) are not set in .env. Skipping article search.");
        return [];
    }
    
    const url = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=${searchTerm}&num=3`;
    
    try {
        const response = await axios.get(url);
        if (!response.data.items) {
            console.log(`Google PSE: No results for "${searchTerm}"`);
            return []; // No results found
        }
        

        return response.data.items.map(item => ({
            title: item.title,
            url: item.link
        }));
    } catch (err) {
        console.error(`Google PSE Error for "${searchTerm}":`, err.response ? err.response.data.error.message : err.message);
        return []; 
    }
}


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
            console.warn(`[getAIHint] Problem not found: ${problemId}`);
            return res.status(404).json({ success: false, message: "Problem not found." }); 
        }
        const problem = problemResult.rows[0];

        // ADAPTIVE LOGIC 
        let userContext = "User is a beginner."; // Default context
        
        if (userId) {
            // 2. Get User's Mastery Score for this topic
            const masteryRes = await pool.query(
                `SELECT mastery_score FROM user_topic_mastery WHERE user_id = $1 AND topic_name = $2`,
                [userId, problem.category]
            );
            
            if (masteryRes.rows.length > 0) {
                const score = masteryRes.rows[0].mastery_score;
                // 3. Create a dynamic context for the AI
                if (score > 50) {
                    userContext = `User is advanced (mastery ${score}). They are likely stuck on a subtle edge case or optimization.`;
                } else if (score > 20) {
                    userContext = `User is intermediate (mastery ${score}). They likely understand the basics but are missing a key part of the algorithm.`;
                } else {
                    userContext = `User is a beginner (mastery ${score}). They need a simple, core-concept-level hint.`;
                }
            } else {
                 userContext = "User is a beginner (no mastery score for this topic yet).";
            }
        }
        console.log(`[getAIHint] 🧠 User Context: ${userContext}`);
        

        // 4. Inject the context into the prompt
        const prompt = `
            Task: Provide a short, conceptual hint for a user stuck on a programming problem,
            tailored to their skill level.

            User Skill Level: ${userContext}

            Problem Title: ${problem.title}
            Problem Description: ${problem.description}
            User's Code:
            \`\`\`
            ${userCode}
            \`\`\`
            Rules:
            - Provide a single, short, conceptual hint.
            - Based on their skill level, give a targeted hint.
            - For beginners: Give a simple, foundational hint.
            - For advanced users: Give a more subtle hint about edge cases, complexity, or a specific trick.
            - Use Markdown formatting.
            - Use $...$ for inline LaTeX and $$...$$ for block LaTeX.
            - DO NOT give away the final answer or write code.
            - Keep the hint to one or two sentences.
        `;
        
        console.log("[getAIHint] Asking AI for a DYNAMIC hint...");
        const model = genAI.getGenerativeModel({ model: AImodel});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const hintText = response.text();
        
        console.log("[getAIHint] AI responded successfully.");
        res.status(200).json({ success: true, hint: hintText });

    } catch (error) {
        console.error("Error getting AI hint:", error);
        res.status(500).json({ success: false, message: "Failed to generate a hint." });
    }
};


const getAIResources = async (req, res) => {
    const { problemId } = req.body;
    console.log(`[getAIResources] 🚀 POST /get-resources for problem ${problemId}`);
    
   
    let genAI;
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (e) {
        console.error("[getAIResources] 🚨 Failed to initialize Gemini AI:", e.message);
        return res.status(500).json({ success: false, message: "AI service is misconfigured." });
    }
    
    let aiResponseText = "";
    try {
        //STEP 1: Get Concepts from AI
        const problemResult = await pool.query(`SELECT title, category FROM problems WHERE problem_id = $1`, [problemId]);
        if (problemResult.rows.length === 0) { 
            console.warn(`[getAIResources] ❌ Problem not found: ${problemId}`);
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

        // STEP 2: Get REAL Links & Videos using Helpers 
        console.log("[getAIResources] 🔍 Fetching real links AND videos for concepts...");

        const enhancedResources = await Promise.all(
            resources.map(async (resource) => {
                const searchTerm = `${resource.concept} algorithm tutorial`;

                // Run both searches in parallel and wait for both to settle
                const [webResult, videoResult] = await Promise.allSettled([
                    searchGoogle(searchTerm), 
                    searchYouTube(searchTerm)
                ]);

                // Process Article Results
                const links = (webResult.status === 'fulfilled') ? webResult.value : [];
                if (webResult.status === 'rejected') {
                     console.warn(`Failed to fetch web links for ${resource.concept}`);
                }

                // Process Video Results
                const videos = (videoResult.status === 'fulfilled') ? videoResult.value : [];
                if (videoResult.status === 'rejected') {
                     console.warn(`Failed to fetch videos for ${resource.concept}`);
                }

                //combined object
                return { ...resource, links, videos };
            })
        );
        
        console.log("[getAIResources] Successfully enhanced resources with links and videos.");
        res.status(200).json({ success: true, resources: enhancedResources });

    } catch (error) {
        console.error("Error getting AI resources:", error.message);
        if (error instanceof SyntaxError) {
             console.error("RAW AI RESPONSE (Failed to parse)");
             console.error(aiResponseText);
            
             return res.status(500).json({ success: false, message: "Failed to understand AI's response." });
        }
        res.status(500).json({ success: false, message: "Failed to find resources." });
    }
};




const submitOnboarding = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[submitOnboarding] POST /onboarding for User ${userId}`);

    if (!userId) {
        console.warn("[submitOnboarding] User not authenticated.");
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }

    const assessments = req.body.assessments; 
    console.log("[submitOnboarding] Received assessments:", assessments);
    
    if (!assessments || !Array.isArray(assessments)) {
        console.warn("[submitOnboarding] Invalid data.");
        return res.status(400).json({ success: false, message: "Invalid assessment data." });
    }

    const scoreMap = { 'None': 0, 'Easy': 20, 'Moderate': 40, 'Hard': 60 };
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        console.log("[submitOnboarding] Saving mastery scores to DB...");
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
        
        return generateLearningPath(req, res); // Call the "Brain"
        
    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error('[submitOnboarding] Error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to save assessment.' });
    } finally {
        if (client) client.release();
    }
};



const submitTutorialFeedback = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[submitTutorialFeedback] POST /tutorial-feedback for User ${userId}`);
    if (!userId) {
        console.warn("[submitTutorialFeedback] User not authenticated.");
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }
    const { topic_name, rating, confused_subtopic } = req.body;
    console.log(`[submitTutorialFeedback] Feedback: ${topic_name}, Rating: ${rating}, Confused: ${confused_subtopic}`);
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
        console.log("[submitTutorialFeedback] Saved feedback to DB.");

        if (rating > 3) { 
            console.log("[submitTutorialFeedback] User satisfied. Fetching easy problems...");
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

        console.log("[submitTutorialFeedback] User confused. Calling AI for remediation...");
        let genAI;
        try {
            genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        } catch (e) {
            console.error("[submitTutorialFeedback] Failed to initialize Gemini AI:", e.message);
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
            You must return *only* a single valid JSON object. Do not add markdown or conversational text.
            {
              "explanation": "Your clear, concise explanation here...",
              "problem_ids": [101, 102]
            }
        `;

        const model = genAI.getGenerativeModel({ model: AImodel});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponseText = response.text();
        console.log("[submitTutorialFeedback] Raw AI Response:\n", aiResponseText);

        let jsonText = aiResponseText;
        if (jsonText.startsWith("```json")) {
            jsonText = jsonText.match(/```json\s*([\s\S]*?)\s*```/)[1];
        }
        const remediation = JSON.parse(jsonText);
        console.log("[submitTutorialFeedback] Parsed AI remediation.");

        const problemsRes = await pool.query(
            `SELECT problem_id, title, difficulty FROM problems WHERE problem_id = ANY($1::int[])`,
            [remediation.problem_ids]
        );
        console.log(`[submitTutorialFeedback] Fetched ${problemsRes.rows.length} remediation problems.`);

        res.status(200).json({
            success: true,
            message: "Here's some extra help on that topic!",
            explanation: remediation.explanation,
            problems: problemsRes.rows
        });

    } catch (err) {
        console.error('[submitTutorialFeedback] Error:', err.message);
        if (err instanceof SyntaxError) {
             console.error("RAW AI RESPONSE (Failed to parse)");
             console.error(aiResponseText);
           
             return res.status(500).json({ success: false, message: "Failed to understand AI's response." });
        }
        res.status(500).json({ success: false, message: 'Failed to get remediation.' });
    } finally {
        if (client) client.release();
    }
};

const generateLearningPath = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[generateLearningPath] POST /generate-path for User ${userId}`);
    if (!userId) {
        console.warn("[generateLearningPath] User not authenticated.");
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }

    let genAI;
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (e) {
        console.error("[generateLearningPath] Failed to initialize Gemini AI:", e.message);
        return res.status(500).json({ success: false, message: "AI service is misconfigured." });
    }

    let aiResponseText = "";
    try {
        console.log("[generateLearningPath] fetching user data, prereqs, and topics...");
        const masteryRes = await pool.query(
            `SELECT topic_name, mastery_score FROM user_topic_mastery WHERE user_id = $1`,
            [userId]
        );
        const userMastery = masteryRes.rows;
        const prereqRes = await pool.query(`SELECT * FROM topic_prerequisites`);
        const prerequisites = prereqRes.rows;
        const topicsRes = await pool.query(`SELECT topic_name FROM tutorials`);
        const allTopics = topicsRes.rows.map(r => r.topic_name);

        const prompt = `
            You are a JSON-only API that creates a complete learning path for a user.

            Input data:
            - "userMastery": topic_name with mastery_score
            - "allTopics": all available tutorial topics
            - "prerequisites": dependencies between topics

            GOAL:
            Return an ordered learning path covering ALL topics the user should study or improve upon.

            RULES:
            1. Start from topics where mastery_score <= 0 (beginner level).
            2. Respect prerequisites — a topic appears only after all its prerequisites are above 20 mastery_score.
            3. Each topic should include a difficulty:
                - "Easy" if mastery_score <= 0
                - "Medium" if 1–20
                - "Hard" if >50 (mastered but can be revisited)
            4. If a user already has >50 on all topics, order them from weakest (lowest >20) to strongest and mark all as "Hard".
            5. Return ONLY JSON in this format:
                {
                    "learning_path": [
                        {"topic": "Topic1", "difficulty": "Easy"},
                        {"topic": "Topic2", "difficulty": "Medium"},
                        ...
                    ]
                }

            DATA:
            {
                "userMastery": ${JSON.stringify(userMastery)},
                "allTopics": ${JSON.stringify(allTopics)},
                "prerequisites": ${JSON.stringify(prerequisites)}
            }
        `;

        console.log("[generateLearningPath] Asking AI for full learning path...");
        const model = genAI.getGenerativeModel({ model: AImodel});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponseText = response.text();
        console.log("[generateLearningPath] Raw AI Response:\n", aiResponseText);

        let jsonText = aiResponseText.trim(); 
        if (jsonText.startsWith("```json")) {
            const match = jsonText.match(/```json\s*([\s\S]*?)\s*```/); 
            if (match && match[1]) {
                 jsonText = match[1].trim(); 
            }
        }
        const aiData = JSON.parse(jsonText); 
        const learningPath = aiData.learning_path;
        console.log("[generateLearningPath] Parsed AI learning path:", learningPath);

        if (!Array.isArray(learningPath) || learningPath.length === 0) {
            console.warn("[generateLearningPath] AI returned empty or invalid path.");
            return res.status(400).json({ success: false, message: "AI did not generate a valid learning path." });
        }

        const problemIds = [];
        for (const item of learningPath) {
            const { topic, difficulty } = item;
            const problemsRes = await pool.query(
                `SELECT problem_id FROM problems WHERE category = $1 AND difficulty = $2 ORDER BY problem_id LIMIT 3`,
                [topic, difficulty]
            );
            if (problemsRes.rows.length === 0) {
                console.warn(`[generateLearningPath] No problems for ${topic}/${difficulty}, trying fallback...`);
                const fallback = await pool.query(
                    `SELECT problem_id FROM problems WHERE category = $1 AND difficulty = 'Easy' LIMIT 3`,
                    [topic]
                );
                problemIds.push(...fallback.rows.map(r => r.problem_id));
            } else {
                problemIds.push(...problemsRes.rows.map(r => r.problem_id));
            }
        }

        console.log(`[generateLearningPath] Collected ${problemIds.length} total problems for path.`);

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
            console.log("[generateLearningPath] Saved new full path to DB.");
        } catch (e) {
            await client.query("ROLLBACK");
            throw e;
        } finally {
            client.release();
        }

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
            message: "Full learning path generated!",
            learning_path: learningPath,
            problems: pathRes.rows
        });

    } catch (error) {
        console.error("Error generating full learning path:", error.message);
        if (error instanceof SyntaxError) {
            console.error("RAW AI RESPONSE (Failed to parse)");
            console.error(aiResponseText);
            
            return res.status(500).json({ success: false, message: "Failed to parse AI response." });
        }
        res.status(500).json({ success: false, message: "Failed to generate full learning path." });
    }
};

const getLearningPath = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[getLearningPath] GET /get-path for User ${userId}`);
    if (!userId) {
        console.warn("[getLearningPath] User not authenticated.");
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