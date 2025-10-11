const pool =require('../pool');

// populate users 
const sql=`
Insert into users (username,email,password) values
    ('ashpreet','ash@gmail.com','ash'),
    ('gagandeep','gagan@gmail.com','gagan'),
    ('krishnarsh','krish@gmail.com','krish')
`;




async function main(){
    await pool.query(sql);
    await pool.end();

}
main();


