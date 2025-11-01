// pool.js (Modified)
require('dotenv').config({path:require('path').resolve(__dirname,'../.env')});
const {Pool}=require('pg');


// Best practice: Check for DATABASE_URL first (used by Render, Heroku, etc.)
// If DATABASE_URL is set (in production), use that.
// If not (in development), fallback to individual variables.

const connectionConfig = process.env.DATABASE_URL 
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            // Render often requires SSL rejection to be disabled for the connection to work
            rejectUnauthorized: false,
        },
      }
    : {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        database:process.env.DB_DATABASE,
        password:process.env.DB_PASSWORD,
        port:parseInt(process.env.DB_PORT,10)
    };


module.exports=new Pool(connectionConfig);

// NOTE: You must also ensure your local .env file is updated to use DATABASE_URL,
// or keep your local .env as-is if you prefer the fallback structure.