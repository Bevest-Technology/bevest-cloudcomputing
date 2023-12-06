// const mysql = require('mysql2');
const Sequelize = require('sequelize');


// Define database connection pool - mysql2 lib
// const dbPool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true
// });

// Define database connection pool - sequalize lib
const db = new Sequelize( process.env.DB_NAME , process.env.DB_USERNAME , process.env.DB_PASSWORD , {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});


 
// module exports
// module.exports = dbPool.promise();
module.exports = db;