// call database - mysql2
// const dbPool = require('../config/database');
// const bcrypt = require('bcrypt');
// const User   = require('../config/database');

// call database - sequalize
const Sequelize = require('sequelize');
const db = require('../config/database');

// define entity - Users
const { DataTypes } = Sequelize;

const Users = db.define('users', {
    displayName:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    role:{
        type:DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
    // createdAt:{
    //     type: DataTypes.STRING
    // },
    // updatedAt:{
    //     type: DataTypes.STRING
    // }
},{
    freezeTableName:true
});

(async () => {
    await db.sync();
})();

module.exports = Users;