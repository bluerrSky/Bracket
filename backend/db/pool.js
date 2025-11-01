// db/pool.js
// DO NOT load dotenv here. app.js does it.
const { Pool } = require('pg');

// This logic automatically switches between production and local
const connectionConfig = process.env.DATABASE_URL 
    ? {
        // Production (Render/Heroku)
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // Required for most cloud databases
        },
      }
    : {
        // Local
        host: process.env.DB_HOST,
        user: 'dummy',
        database: 'project',
        password: 'pass',
        port: parseInt(process.env.DB_PORT, 10)
        // Add SSL here if your local psql test requires it
        // ssl: { rejectUnauthorized: false }
    };

const pool = new Pool(connectionConfig);

// Add a global error listener for safety
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle database client', err);
});

module.exports = pool;