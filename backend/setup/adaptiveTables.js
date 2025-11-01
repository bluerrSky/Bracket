const pool = require('../db/pool');

const sql = `
    CREATE TABLE IF NOT EXISTS topic_prerequisites (
        topic_id VARCHAR(20) NOT NULL,
        prerequisite_id VARCHAR(20) NOT NULL,
        PRIMARY KEY (topic_id, prerequisite_id)
    );
    
    CREATE TABLE IF NOT EXISTS user_topic_mastery (
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        topic_name VARCHAR(20) NOT NULL,
        mastery_score INT DEFAULT 0,
        problems_attempted INT DEFAULT 0,
        problems_solved INT DEFAULT 0,
        PRIMARY KEY (user_id, topic_name)
    );
    
    CREATE TABLE IF NOT EXISTS user_learning_path (
        path_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        problem_id INT REFERENCES problems(problem_id) ON DELETE CASCADE,
        status VARCHAR(20) DEFAULT 'Recommended',
        order_index INT NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS tutorials (
        topic_name VARCHAR(20) PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL, -- Your Markdown tutorial content
        subtopics JSONB -- e.g., ['Base Case', 'Recursive Step']
    );
    
    CREATE TABLE IF NOT EXISTS user_tutorial_progress (
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        topic_name VARCHAR(20) REFERENCES tutorials(topic_name) ON DELETE CASCADE,
        status VARCHAR(20) DEFAULT 'Started',
        satisfaction_rating INT, -- 1-5 scale
        PRIMARY KEY (user_id, topic_name)
    );
`;

async function main() {
    try {
        console.log('--- Creating/Updating all adaptive tables... ---');
        await pool.query(sql);
        console.log('✅ --- All 5 adaptive tables are ready! ---');
    } catch (err) {
        console.error('❌ Error creating adaptive tables:', err.message);
    } finally {
        await pool.end();
    }
}
main();