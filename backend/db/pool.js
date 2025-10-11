require('dotenv').config({path:require('path').resolve(__dirname,'../.env')});
const {Pool}=require('pg');


module.exports=new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    database:process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    port:parseInt(process.env.DB_PORT,10)
});

