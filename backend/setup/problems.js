// setup/problems.js
// Note: Changed path to '../db/pool'
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
    drop table if exists test_cases cascade;
    create table test_cases(
        tid int primary key GENERATED ALWAYS AS IDENTITY,
        problem_id int references problems(problem_id) on delete cascade,
        input text not null,
        expected_output text not null,
        is_sample boolean default false
    );
`;

// Submissions table
const sql3 = `
    drop table if exists submissions cascade;
    create table submissions(
        sid int primary key GENERATED ALWAYS AS IDENTITY,
        user_id int references users(user_id) on delete cascade,
        problem_id int references problems(problem_id) on delete cascade,
        language_id int,
        source_code text,
        sumitted_at date,
        status varchar(20),
        execution_time float,
        execution_memory float,
        token varchar(50)
    );
`;

async function main() {
    try {
        console.log('--- Creating "problems" table... ---');
        await pool.query(sql1);
        console.log('✅ "problems" table created.');

        console.log('--- Creating "test_cases" table... ---');
        await pool.query(sql2);
        console.log('✅ "test_cases" table created.');
        
        console.log('--- Creating "submissions" table... ---');
        await pool.query(sql3);
        console.log('✅ "submissions" table created.');
        
        console.log('--- All tables created successfully! ---');
        await pool.end(); // This is OK here because it's a script
    } catch (err) {
        console.error('❌ Error creating tables:', err.message);
    }
}
main();