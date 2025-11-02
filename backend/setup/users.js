// setup/users.js
// Note: Changed path to '../db/pool'
const pool = require('../db/pool');

const sql = `
    drop table if exists users cascade;
    create table users(
    user_id int primary key GENERATED ALWAYS AS IDENTITY,
    username varchar(60),
    email varchar(100) unique,
    password text,
    proficiency varchar(20) default 'Novice',
    problems_solved int default 0,
    rating int default 0
    );
`

async function main() {
    try {
        console.log('--- Creating "users" table... ---');
        await pool.query(sql);
        console.log('✅ "users" table created.');
        await pool.end(); // This is OK here because it's a script
    } catch (err) {
        console.error('❌ Error creating "users" table:', err.message);
    }
}
main();