
const pool = require('../db/pool');

const sql = `
    drop table if exists users cascade;
    create table users(
    user_id int primary key GENERATED ALWAYS AS IDENTITY,
    username varchar(60) unique,
    email varchar(100) unique,
    password text,
    proficiency varchar(20) default 'Novice',
    problems_solved int default 0,
    rating int default 0
    );
`
const sql1=`
    DROP TABLE IF EXISTS user_problem CASCADE;

    CREATE TABLE user_problem (
    user_id INT NOT NULL,
    problem_id INT NOT NULL,
    attempted BOOLEAN,
    solved BOOLEAN,
    
    PRIMARY KEY (user_id, problem_id),
    
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (problem_id) REFERENCES problems(problem_id) ON DELETE CASCADE
);

`;
async function main() {
    try {
        
        await pool.query(sql);
        console.log(' users table created.');
        await pool.query(sql1);
        console.log('user_problem table created');
        await pool.end(); 
    } catch (err) {
        console.error('Error creating users table:', err.message);
    }
}
main();