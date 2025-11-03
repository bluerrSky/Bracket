const { Pool } = require('pg');


const connectionConfig = process.env.DATABASE_URL 
    ? {
        // Production 
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false, // Required for cloud databases
        },
      }
    : {
        // Local
        host: process.env.DB_HOST,
        user: 'gagan',
        database: 'bracketdb',
        password: 'pass',
        port: parseInt(process.env.DB_PORT, 10)
        
    };

const pool = new Pool(connectionConfig);


pool.on('error', (err, client) => {
    console.error('Unexpected error on idle database client', err);
});

module.exports = pool;