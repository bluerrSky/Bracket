const pool = require('../db/pool');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const AImodel=process.env.AI_MODEL;
async function main() {
    let client;
    let genAI;
    try {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        client = await pool.connect();
        
        console.log('--- Connected to DB. Fetching topics... ---');
        // We get topics from the tutorials you just created
        const topicsRes = await pool.query(`SELECT topic_name FROM tutorials`);
        const allTopics = topicsRes.rows.map(r => r.topic_name);
        
        if (allTopics.length === 0) {
            throw new Error("Your 'tutorials' table is empty. Please run 'populate_tutorials.js' first.");
        }
        console.log('--- Found Topics:', allTopics, '---');
        
        const prompt = `
            You are an expert Computer Science curriculum designer.
            Here is a list of all available DSA topics:
            ${JSON.stringify(allTopics)}

            Define the prerequisite relationships between them. A prerequisite is a topic that *must* be understood before logically moving on to the next.

            Return your answer *only* as a valid JSON array of objects, with no other text. Each object must have a "topic" key and a "prerequisite" key.

            - A topic can have multiple prerequisites (create a separate object for each).
            - Only use topics from the list provided.
            - Be logical. For example, "DP" requires "Recursion".

            Example format:
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
        const aiRules = JSON.parse(response.text());

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