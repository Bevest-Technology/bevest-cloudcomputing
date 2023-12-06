// define function and library
const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config()
PORT = process.env.PORT
const UsersRoutes = require('./routes/users');
const cors = require('cors');
const db = require('./config/database');
// import cors from "cors";
// import { cookie } from "express-validator";

//define web server
const app = express()

// mengizinkan file json
app.use(express.json());

// using misc library
app.use(cookieParser());
app.use(cors({ credentials: true, origin:'http://localhost:3000'}));

// initiate index endpoint
app.get('/', (req, res) => {
    res.send("Welcome to Bevest Apps")
})


  
// call endpoint users
app.use('/users', UsersRoutes);

// error handling server
app.use((err, req, res, next) => {
    res.json({
        message: err.message
    })
})

// initiate port web server
app.listen(PORT, () => {
    console.log(`Web server is running on port: ${PORT}`)
})