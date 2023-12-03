const mysql = require('mysql2');

// Define database connection pool 
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true
});

// module exports
module.exports = dbPool.promise();