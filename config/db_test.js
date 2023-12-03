// database demo config
const mysql = require('mysql2');

// Define database connection pool 
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true
});

// database test
app.use('/db', (req, res) => {
    dbPool.execute('SELECT * FROM users', (err, rows) => {
    if(err){
        res.json({
            message: 'connection failed'
        })
    }

    res.json({
        message: 'connection success',
        data: rows
    })
})
})