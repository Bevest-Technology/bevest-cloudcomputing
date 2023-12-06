// library
const UsersModel = require('../models/users');
const jwt = require("jsonwebtoken");
const bcrypt   = require('bcrypt');
const Users = require('../models/users');


// === RESPONSE METHOD ===
// GET ALL ACCOUNT BEVEST RESPONSE
const getUsers = async (req, res) => {
    try {
        const users = await UsersModel.findAll({
            attributes:[
                'id',
                'displayName',
                'email',
                'password',
                'role'
            ]
        })
        
        res.status(200).json({
            message: 'Data User berhasil ditampilkan',
            data: users
        })
    } catch (error) {
        res.status(500).json({
            message: 'Data User gagal ditampilkan',
            serverMessage: error
        })
    }
}


// REGISTER ACCOUNT BEVEST RESPONSE
const register = async (req, res) => {
    // mengambil data nama, email, password, dan role
    const { displayName, email, password, confPassword, role } = req.body;

    // verif password == confPassword
    if(password !== confPassword)
        return res.status(400).json({
            message: "Password dan Confirm Password tidak cocok"
    })

    // enkripsi password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        await UsersModel.create({
            displayName: displayName,
            email: email,
            password: hashPassword,
            role: role
        });

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

// LOGIN ACCOUNT BEVEST RESPONSE
const login = async (req, res) => {

    try {
        // mencari user berdasarkan email
        const user = await UsersModel.findAll({
            where:{
                email: req.body.email
            }
        });

        // mencocokkan password user
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match)
            return res.status(400).json({
                message: "Password salah"
            });
        
        // accesstoken user
        const userId = user[0].id;
        const displayName = user[0].displayName;
        const email = user[0].email;
        const accessToken = jwt.sign({
            userId, 
            displayName, 
            email
        }, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({
            userId, 
            displayName, 
            email
        }, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        await UsersModel.update({
            refresh_token: refreshToken}, {
            where:{
                id: userId
            }
        });

        // cookie user
        res.cookie('refreshToken', refreshToken, {
            // httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        
        // res.json({ accessToken });

        res.status(200).json({
            accessToken,
            message: 'Login berhasil',
            data: req.body
        })
    } catch(error){
        res.status(404).json({
            message: 'Email tidak ditemukan',
            serverMessage: error
        });
    }
}

// REFRESH TOKEN ACCOUNT RESPONSE
const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        // jika tidak ada refresh token
        if(!refreshToken) 
            return res.status(401);
    
        // mencari refresh token pada user
        const user = await UsersModel.findAll({
            where:{
                refresh_token: refreshToken
            }
        });
    
        // jika user tidak ada, tidak diberikan akses
        if(!user[0])
            return res.status(403);
    
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                
                if(err) 
                    return res.sendStatus(403);

                const userId = user[0].id;
                const displayName = user[0].displayName;
                const email = user[0].email;
                const accessToken = jwt.sign({userId, displayName, email}, process.env.ACCESS_TOKEN_SECRET,{
                    expiresIn: '15s'
                });
                res.json({ accessToken });
            });
    } catch (error) {
        res.status(404).json({
            message: error
        });
    }
}

// LOGOUT ACCOUNT RESPONSE
const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken)
        return res.status(204);

    const user = await UsersModel.findAll({
        where:{
            refresh_token:refreshToken
        }
    });

    if(!user[0])
        return res.status(204);
    const userId = user[0].id;

    await Users.update({
        refresh_token: null},{
            where:{
                id: userId
            }
    });

    res.clearCookie('refreshToken');
    return res.status(200);
}



// module exports
module.exports = {
    register,
    getUsers,
    login,
    refreshToken,
    logout
}