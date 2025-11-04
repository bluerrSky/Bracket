require('dotenv').config();
const pool = require('../db/pool');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const AImodel=process.env.AI_MODEL;

async function main() {
    console.log(`MODEL NAME: ${AImodel}`);
    let client;
    let genAI;
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        client = await pool.connect();
        
        console.log('--- Connected to DB. Fetching topics... ---');
        // We get topics from the tutorials you just created
        const topicsRes = await pool.query(`SELECT topic_name FROM tutorials;`);
        const allTopics = topicsRes.rows.map(r => r.topic_name);
        
        if (allTopics.length === 0) {
            throw new Error("Your 'tutorials' table is empty. Please run 'populate_tutorials.js' first.");
        }
        
        
        // A more robust prompt for aiPrereqsGenerator.js

        const prompt = `
            You are a JSON-only API. You are an expert Computer Science curriculum designer.
            Your task is to define the prerequisite relationships between the provided topics.
            A prerequisite is a topic that *must* be understood before logically moving on to the next.

            HERE IS THE *ONLY* LIST OF VALID TOPICS:
            ${JSON.stringify(allTopics)}

            RULES:
            1. Return your answer *only* as a single, valid JSON array of objects.
            2. Do NOT add any conversational text, explanations, or markdown.
            3. Each object must have a "topic" key and a "prerequisite" key.
            4. *Only* use topic names from the list provided above.
            5. Be logical. For example, "DP" requires "Recursion".
            6. A topic can have multiple prerequisites. Create a separate object for each dependency.
            7. If a topic (like "Arrays") has NO prerequisites from the list, do NOT create an entry for it.

            EXAMPLE FORMAT:
            [
            {"topic": "DP", "prerequisite": "Recursion"},
            {"topic": "DP", "prerequisite": "Arrays"},
            {"topic": "Graphs", "prerequisite": "Arrays"}
            ]
        `;

        console.log('--- Asking AI to generate prerequisite map... ---');
        
        const model = genAI.getGenerativeModel({ model: AImodel });
        const result = await model.generateContent(prompt);
        const response = await result.response;
// --- FIX: Clean the AI's response before parsing ---
        const rawText = response.text();
        
        // Find the first '[' and the last ']'
        const jsonStartIndex = rawText.indexOf('[');
        const jsonEndIndex = rawText.lastIndexOf(']');
        
        // Extract just the JSON array string
        const cleanText = rawText.substring(jsonStartIndex, jsonEndIndex + 1);
        
        // Now, parse the clean text
        const aiRules = JSON.parse(cleanText);
        // --- End of Fix ---

        console.log('--- AI generated these rules: ---');
        console.log(aiRules);

        await client.query('BEGIN');
        console.log('--- Saving rules to "topic_prerequisites" table... ---');
        await client.query(`TRUNCATE TABLE topic_prerequisites`); // Clear old rules

        for (const rule of aiRules) {
            // Check if topics exist before inserting
            if (allTopics.includes(rule.topic) && allTopics.includes(rule.prerequisite)) {
                await client.query(
                    `INSERT INTO topic_prerequisites (topic_id, prerequisite_id) VALUES ($1, $2)`,
                    [rule.topic, rule.prerequisite]
                );
            } else {
                console.warn(`Skipping rule: ${rule.prerequisite} -> ${rule.topic} (one or both topics not in tutorials table)`);
            }
        }
        
        await client.query('COMMIT');
        console.log('--- Prerequisite map has been generated and saved! ---');

    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error('--- FAILED TO GENERATE PREREQ MAP --- ');
        console.error(err.message);
    } finally {
        if (client) client.release();
        await pool.end();
        console.log('--- AI map generation script finished. ---');
    }
}
main();