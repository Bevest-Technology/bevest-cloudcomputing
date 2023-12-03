// library
const UsersModel = require('../models/users');

// === RESPONSE METHOD ===

// REGISTER AKUN BEVEST RESPONSE
const register = async (req, res) => {
    const {body} = req;

    try {
        await UsersModel.register(body);

        res.status(201).json({
            message: 'Akun berhasil dibuat',
            data: req.body
        })
    } catch (error) {
        res.status(500).json({
            message: 'Akun gagal dibuat',
            serverMessage: error
        })
    }
}

// SHOW AKUN BEVEST RESPONSE
const getUsers = async (req, res) => {
    try {
        // destructuring data
        const [data] = await UsersModel.getUsers();
        
        res.status(201).json({
            message: 'Data User berhasil ditampilkan',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: 'Data User gagal ditampilkan',
            serverMessage: error
        })
    }
}

// module exports
module.exports = {
    register,
    getUsers
}