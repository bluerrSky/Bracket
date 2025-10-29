const pool=require('./pool');

const sql=`
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

async function main(){
    try{
        
        await pool.query(sql);
        await pool.end();
    }catch(err){
        console.log(err.message);
        
    }

}
main();
