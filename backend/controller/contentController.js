const pool = require('../db/pool');


// --- 2. PROBLEM & HINT FUNCTIONS ---

const getProblemById = async function (req, res) {
    const { id } = req.params;
    console.log(`[getProblemById] 🚀 GET /problems/${id}`);
    try {
        const problem = await pool.query(`SELECT problem_id, category, title, description, difficulty, time_limit, memory_limit FROM problems WHERE problem_id=$1`, [id]);
        if (problem.rows.length === 0) { 
            console.warn(`[getProblemById] ❌ Not found: ${id}`);
            return res.status(404).json({ message: `No problem found with id = ${id}` }); 
        }
        console.log(`[getProblemById] ✅ Found: ${problem.rows[0].title}`);
        return res.status(200).json(problem.rows[0]);
    } catch (err) {
        console.error(`[getProblemById] 🚨 Error:`, err.message);
        return res.status(500).json({ message: 'Server error while fetching the problem.' });
    }
};

const getProblemsByCat = async function (req, res) {
    const { category } = req.params;
    console.log(`[getProblemsByCat] 🚀 GET /problems/category/${category}`);
    try {
        const problems = await pool.query(`SELECT problem_id, category, title, description, difficulty, time_limit, memory_limit FROM problems WHERE LOWER(category) = LOWER($1)`, [category]);
        if (problems.rows.length === 0) { 
            console.warn(`[getProblemsByCat] ❌ Not found: ${category}`);
            return res.status(404).json({ message: `No problems found in category = ${category}` }); 
        }
        console.log(`[getProblemsByCat] ✅ Found ${problems.rows.length} problems.`);
        return res.status(200).json(problems.rows);
    } catch (err) {
        console.error(`[getProblemsByCat] 🚨 Error:`, err.message);
        return res.status(500).json({ message: 'Server error while fetching problems.' });
    }
};

const getAllTopics = async (req, res) => {
    console.log("[getAllTopics] 🚀 GET /topics");
    try {
        const topicsRes = await pool.query(`SELECT topic_name, title, subtopics FROM tutorials`);
        console.log(`[getAllTopics] ✅ Found ${topicsRes.rows.length} topics.`);
        res.status(200).json(topicsRes.rows);
    } catch (err) {
        console.error(`[getAllTopics] 🚨 Error:`, err.message);
        res.status(500).json({ message: 'Server error while fetching topics.' });
    }
};


const getTutorial = async (req, res) => {
    const { topic } = req.params;
    console.log(`[getTutorial] 🚀 GET /tutorial/${topic}`);
    try {
        const tutorialRes = await pool.query(
            `SELECT topic_name, title, content, subtopics FROM tutorials WHERE LOWER(topic_name) = LOWER($1)`, 
            [topic]
        );
        if (tutorialRes.rows.length === 0) {
            console.warn(`[getTutorial] ❌ Not found: ${topic}`);
            return res.status(404).json({ message: 'Tutorial not found.' });
        }
        console.log(`[getTutorial] ✅ Found: ${tutorialRes.rows[0].title}`);
        res.status(200).json(tutorialRes.rows[0]);
    } catch (err) {
        console.error(`[getTutorial] 🚨 Error:`, err.message);
        res.status(500).json({ message: 'Server error while fetching tutorial.' });
    }
};

module.exports={
    getProblemById,
    getProblemsByCat,
    getAllTopics,
    getTutorial,

}