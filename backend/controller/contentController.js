const pool = require('../db/pool');



const getProblemById = async function (req, res) {
    const { id } = req.params;
    const userId = req.user ? req.user.user_id : null;
    try {
        const sql = `
            SELECT 
                p.*, 
                up.attempted, 
                up.solved 
            FROM 
                problems p
            LEFT JOIN 
                user_problem up ON p.problem_id = up.problem_id AND up.user_id = $2
            WHERE 
                p.problem_id = $1;
        `;
        const problem = await pool.query(sql, [id, userId]);
        if (problem.rows.length === 0) { 
            return res.status(404).json({ message: `No problem found with id = ${id}` }); 
        }
        
        return res.status(200).json(problem.rows[0]);
    } catch (err) {
        console.error(`[getProblemById] Error:`, err.message);
        return res.status(500).json({ message: 'Server error while fetching the problem.' });
    }
};

const getProblemsByCat = async function (req, res) {
    const { category } = req.params;
    const userId = req.user ? req.user.user_id : null;
    try {
        const sql = `
            SELECT 
                p.problem_id, p.title, p.difficulty, p.category,
                up.attempted, 
                up.solved 
            FROM 
                problems p
            LEFT JOIN 
                user_problem up ON p.problem_id = up.problem_id AND up.user_id = $2
            WHERE 
                LOWER(p.category) = LOWER($1);
        `;
        const problems = await pool.query(sql, [category, userId]);
        if (problems.rows.length === 0) { 
            
            return res.status(404).json({ message: `No problems found in category = ${category}` }); 
        }

        return res.status(200).json(problems.rows);
    } catch (err) {
        console.error(`[getProblemsByCat] Error:`, err.message);
        return res.status(500).json({ message: 'Server error while fetching problems.' });
    }
};

const getAllTopics = async (req, res) => {

    try {
        const topicsRes = await pool.query(`SELECT topic_name, title, subtopics FROM tutorials`);
        
        res.status(200).json(topicsRes.rows);
    } catch (err) {
        console.error(`[getAllTopics] Error:`, err.message);
        res.status(500).json({ message: 'Server error while fetching topics.' });
    }
};


const getTutorial = async (req, res) => {
    const { topic } = req.params;
    
    try {
        const tutorialRes = await pool.query(
            `SELECT topic_name, title, content, subtopics FROM tutorials WHERE LOWER(topic_name) = LOWER($1)`, 
            [topic]
        );
        if (tutorialRes.rows.length === 0) {
            console.warn(`[getTutorial] Not found: ${topic}`);
            return res.status(404).json({ message: 'Tutorial not found.' });
        }
        console.log(`[getTutorial] Found: ${tutorialRes.rows[0].title}`);
        res.status(200).json(tutorialRes.rows[0]);
    } catch (err) {
        console.error(`[getTutorial] Error:`, err.message);
        res.status(500).json({ message: 'Server error while fetching tutorial.' });
    }
};

module.exports={
    getProblemById,
    getProblemsByCat,
    getAllTopics,
    getTutorial,

}