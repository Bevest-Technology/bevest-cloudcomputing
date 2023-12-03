// library
const express = require('express');
const router = express.Router();

// define user controller
const UserController = require('../controller/users')

// === ROUTES METHOD ===

// REGISTER AKUN BEVEST ENDPOINT
router.post('/register', UserController.register);
router.get('/getUsers', UserController.getUsers);

// module exports
module.exports = router;
