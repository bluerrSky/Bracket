const { GoogleGenerativeAI } = require("@google/generative-ai");
const pool = require('../db/pool');


const getAIHint = async (req, res) => {
    const { problemId, userCode } = req.body;
    console.log(`[getAIHint] 🚀 POST /get-hint for problem ${problemId}`);
    let genAI;
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (e) {
        console.error("[getAIHint] 🚨 Failed to initialize Gemini AI:", e.message);
        return res.status(500).json({ success: false, message: "AI service is misconfigured." });
    }
    
    try {
        const problemResult = await pool.query(`SELECT title, description FROM problems WHERE problem_id = $1`, [problemId]);
        if (problemResult.rows.length === 0) { 
            console.warn(`[getAIHint] ❌ Problem not found: ${problemId}`);
            return res.status(404).json({ success: false, message: "Problem not found." }); 
        }
        const problem = problemResult.rows[0];

        const prompt = `
            Task: Provide a short, conceptual hint for a user stuck on a programming problem.
            Problem Title: ${problem.title}
            Problem Description: ${problem.description}
            User's Code:
            \`\`\`
            ${userCode}
            \`\`\`
            Rules:
            - Provide a single, short, conceptual hint.
            - Use Markdown formatting.
            - Use $...$ for inline LaTeX and $$...$$ for block LaTeX.
            - DO NOT give away the final answer or write code.
            - Guide them toward the correct algorithm, data structure, or an edge case.
            - Keep the hint to one or two sentences.
        `;
        
        console.log("[getAIHint] 💬 Asking AI for hint...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const hintText = response.text();
        
        console.log("[getAIHint] ✅ AI responded successfully.");
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
        
        console.log("[getAIResources] 💬 Asking AI for resources...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponseText = response.text();
        console.log("[getAIResources] 🤖 Raw AI Response:\n", aiResponseText);
        
        let jsonText = aiResponseText.trim();
        if (jsonText.startsWith("```json")) {
            const match = jsonText.match(/```json\s*([\s\S]*?)\s*```/);
            if (match && match[1]) {
                jsonText = match[1].trim();
            }
        }
        const resources = JSON.parse(jsonText);
        console.log("[getAIResources] ✅ Parsed AI response successfully.");

        res.status(200).json({ success: true, resources });
    } catch (error) {
        console.error("Error getting AI resources:", error.message);
        if (error instanceof SyntaxError) {
             console.error("--- RAW AI RESPONSE (Failed to parse) ---");
             console.error(aiResponseText);
             console.error("-----------------------------------------");
             return res.status(500).json({ success: false, message: "Failed to understand AI's response." });
        }
        res.status(500).json({ success: false, message: "Failed to find resources." });
    }
};

// --- 3. NEW ADAPTIVE FUNCTIONS ---


const submitOnboarding = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[submitOnboarding] 🚀 POST /onboarding for User ${userId}`);

    if (!userId) {
        console.warn("[submitOnboarding] ❌ User not authenticated.");
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }

    const assessments = req.body.assessments; 
    console.log("[submitOnboarding] 📊 Received assessments:", assessments);
    
    if (!assessments || !Array.isArray(assessments)) {
        console.warn("[submitOnboarding] ❌ Invalid data.");
        return res.status(400).json({ success: false, message: "Invalid assessment data." });
    }

    const scoreMap = { 'None': 0, 'Easy': 20, 'Moderate': 40, 'Hard': 60 };
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        console.log("[submitOnboarding] 💾 Saving mastery scores to DB...");
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
        console.log("[submitOnboarding] ✅ Mastery scores saved. Forwarding to generate path...");
        
        return generateLearningPath(req, res); // Call the "Brain"
        
    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error('[submitOnboarding] 🚨 Error:', err.message);
        res.status(500).json({ success: false, message: 'Failed to save assessment.' });
    } finally {
        if (client) client.release();
    }
};



const submitTutorialFeedback = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[submitTutorialFeedback] 🚀 POST /tutorial-feedback for User ${userId}`);
    if (!userId) {
        console.warn("[submitTutorialFeedback] ❌ User not authenticated.");
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }
    const { topic_name, rating, confused_subtopic } = req.body;
    console.log(`[submitTutorialFeedback] 📊 Feedback: ${topic_name}, Rating: ${rating}, Confused: ${confused_subtopic}`);
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
        console.log("[submitTutorialFeedback] 💾 Saved feedback to DB.");

        if (rating > 3) { 
            console.log("[submitTutorialFeedback] 😊 User satisfied. Fetching easy problems...");
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

        console.log("[submitTutorialFeedback] 😕 User confused. Calling AI for remediation...");
        let genAI;
        try {
            genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        } catch (e) {
            console.error("[submitTutorialFeedback] 🚨 Failed to initialize Gemini AI:", e.message);
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

        const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponseText = response.text();
        console.log("[submitTutorialFeedback] 🤖 Raw AI Response:\n", aiResponseText);

        let jsonText = aiResponseText;
        if (jsonText.startsWith("```json")) {
            jsonText = jsonText.match(/```json\s*([\s\S]*?)\s*```/)[1];
        }
        const remediation = JSON.parse(jsonText);
        console.log("[submitTutorialFeedback] ✅ Parsed AI remediation.");

        const problemsRes = await pool.query(
            `SELECT problem_id, title, difficulty FROM problems WHERE problem_id = ANY($1::int[])`,
            [remediation.problem_ids]
        );
        console.log(`[submitTutorialFeedback] ✅ Fetched ${problemsRes.rows.length} remediation problems.`);

        res.status(200).json({
            success: true,
            message: "Here's some extra help on that topic!",
            explanation: remediation.explanation,
            problems: problemsRes.rows
        });

    } catch (err) {
        console.error('[submitTutorialFeedback] 🚨 Error:', err.message);
        if (err instanceof SyntaxError) {
             console.error("--- RAW AI RESPONSE (Failed to parse) ---");
             console.error(aiResponseText);
             console.error("-----------------------------------------");
             return res.status(500).json({ success: false, message: "Failed to understand AI's response." });
        }
        res.status(500).json({ success: false, message: 'Failed to get remediation.' });
    } finally {
        if (client) client.release();
    }
};

const generateLearningPath = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[generateLearningPath] 🚀 POST /generate-path for User ${userId}`);
    if (!userId) {
        console.warn("[generateLearningPath] ❌ User not authenticated.");
        return res.status(401).json({ success: false, message: "User not authenticated." });
    }

    let genAI;
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    } catch (e) {
        console.error("[generateLearningPath] 🚨 Failed to initialize Gemini AI:", e.message);
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

        // 🔥 NEW PROMPT: Ask Gemini for a FULL ordered path (not just one topic)
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

        console.log("[generateLearningPath] 💬 Asking AI for full learning path...");
        const model = genAI.getGenerativeModel({ model: "gemini-pro-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponseText = response.text();
        console.log("[generateLearningPath] 🤖 Raw AI Response:\n", aiResponseText);

        let jsonText = aiResponseText.trim(); // Trim whitespace just in case
        if (jsonText.startsWith("```json")) {
            // Corrected regex with single backslashes for \s and \S
            const match = jsonText.match(/```json\s*([\s\S]*?)\s*```/); 
            if (match && match[1]) {
                 jsonText = match[1].trim(); // Extract and trim the captured content
            } else {
                 // Fallback or handle case where block is found but regex fails to capture
                 // For now, let it proceed to JSON.parse(jsonText)
            }
        }
        const aiData = JSON.parse(jsonText); // Proceed with parsing
        const learningPath = aiData.learning_path;
        console.log("[generateLearningPath] ✅ Parsed AI learning path:", learningPath);

        if (!Array.isArray(learningPath) || learningPath.length === 0) {
            console.warn("[generateLearningPath] ⚠️ AI returned empty or invalid path.");
            return res.status(400).json({ success: false, message: "AI did not generate a valid learning path." });
        }

        // 🔎 Get matching problems for all topics in the path
        const problemIds = [];
        for (const item of learningPath) {
            const { topic, difficulty } = item;
            const problemsRes = await pool.query(
                `SELECT problem_id FROM problems WHERE category = $1 AND difficulty = $2 ORDER BY problem_id LIMIT 3`,
                [topic, difficulty]
            );
            if (problemsRes.rows.length === 0) {
                console.warn(`[generateLearningPath] ⚠️ No problems for ${topic}/${difficulty}, trying fallback...`);
                const fallback = await pool.query(
                    `SELECT problem_id FROM problems WHERE category = $1 AND difficulty = 'Easy' LIMIT 3`,
                    [topic]
                );
                problemIds.push(...fallback.rows.map(r => r.problem_id));
            } else {
                problemIds.push(...problemsRes.rows.map(r => r.problem_id));
            }
        }

        console.log(`[generateLearningPath] 💾 Collected ${problemIds.length} total problems for path.`);

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
            console.log("[generateLearningPath] 💾 Saved new full path to DB.");
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

        console.log(`[generateLearningPath] ✅ Returning complete path with ${pathRes.rows.length} problems.`);
        res.status(200).json({
            success: true,
            message: "Full learning path generated!",
            learning_path: learningPath,
            problems: pathRes.rows
        });

    } catch (error) {
        console.error("Error generating full learning path:", error.message);
        if (error instanceof SyntaxError) {
            console.error("--- RAW AI RESPONSE (Failed to parse) ---");
            console.error(aiResponseText);
            console.error("-----------------------------------------");
            return res.status(500).json({ success: false, message: "Failed to parse AI response." });
        }
        res.status(500).json({ success: false, message: "Failed to generate full learning path." });
    }
};

const getLearningPath = async (req, res) => {
    const userId = req.user?.user_id;
    console.log(`[getLearningPath] 🚀 GET /get-path for User ${userId}`);
    if (!userId) {
        console.warn("[getLearningPath] ❌ User not authenticated.");
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
        console.log(`[getLearningPath] ✅ Found ${pathRes.rows.length} items in path.`);
        res.status(200).json(pathRes.rows);
    } catch (err) {
        console.error(`[getLearningPath] 🚨 Error:`, err.message);
        res.status(500).json({ message: 'Server error while fetching learning path.' });
    }
};



module.exports={
    getAIHint,
    getAIResources,
    generateLearningPath,
    getLearningPath,
    submitOnboarding,
    submitTutorialFeedback
};