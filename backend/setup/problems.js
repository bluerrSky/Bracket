require('dotenv').config();
const pool = require('../db/pool');

// Problems table
const sql1 = `
    drop table if exists problems cascade;
    create table problems(
        problem_id int primary key,
        category varchar(20) not null,
        title varchar(200) not null,
        description text not null,
        difficulty varchar(20),
        time_limit int not null,
        memory_limit int not null
    );
`;

// Test_cases table
const sql2 = `
    DROP TABLE IF EXISTS test_cases CASCADE;

    CREATE TABLE test_cases (
        tid INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        problem_id INT REFERENCES problems(problem_id) ON DELETE CASCADE,
        input TEXT NOT NULL,
        expected_output TEXT NOT NULL,
        is_sample BOOLEAN DEFAULT FALSE
    );

`;

// Submissions table
const sql3 = `
    DROP TABLE IF EXISTS submissions CASCADE;

    CREATE TABLE submissions (
        sid INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
        problem_id INT REFERENCES problems(problem_id) ON DELETE CASCADE,
        language_id INT,
        source_code TEXT,
        submitted_at DATE, 
        status VARCHAR(20),
        execution_time DOUBLE PRECISION,  
        execution_memory DOUBLE PRECISION,  
        token VARCHAR(50)
    );

`;

async function main() {
    try {
        
        await pool.query(sql1);
        console.log('problems table created.');


        await pool.query(sql2);
        console.log('test_cases table created.');
        
        await pool.query(sql3);
        console.log('submissions table created.');
        
    
        await pool.end(); 
    } catch (err) {
        console.error('Error creating tables:', err.message);
    }
}
main();