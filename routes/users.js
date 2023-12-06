// library
const express = require('express');
const router = express.Router();

// define user controller
const UserController = require('../controller/users')

// define token
const verifyToken = require('../middleware/verifyToken');

// === ROUTES METHOD ===
// GET ACCOUNT BEVEST ENDPOINT
router.get('/getUsers', UserController.getUsers);

// REGISTER ACCOUNT BEVEST ENDPOINT
router.post('/register', UserController.register);

// LOGIN ACCOUNT BEVEST ENDPOINT
router.post('/login', UserController.login);

// GET TOKEN ACCOUNT BEVEST ENDPOINT
router.get('/token', UserController.refreshToken);

// LOGOUT ACCOUNT BEVEST ENDPOINT
router.delete('/logout', UserController.logout);

// TEST ENDPOINT
// router.post('/test', UserController.test);

// module exports
module.exports = router;
