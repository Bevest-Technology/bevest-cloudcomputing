// call database
const dbPool = require('../config/database');

// MODELS USERS - Connecting to database

// Register Models
const register = (body) => {
    const SQLQuery = `INSERT INTO users (displayName, email, password, role) VALUES ('${body.displayName}','${body.email}','${body.password}','${body.role}')`;

    return dbPool.execute(SQLQuery);
}

// Get All User Models
const getUsers = () => {
    const SQLQuery = `SELECT * FROM users`;

    return dbPool.execute(SQLQuery);
}

// module exports
module.exports = {
    register,
    getUsers
}