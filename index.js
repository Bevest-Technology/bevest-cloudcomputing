// define function and library
const express = require('express');
require('dotenv').config()
PORT = process.env.PORT
const UsersRoutes = require('./routes/users');

//define web server
const app = express()

// mengizinkan file json
app.use(express.json());

// initiate index endpoint
app.get('/', (req, res) => {
    res.send("Ini halaman endpoint index")
})

// call endpoint users
app.use('/users', UsersRoutes);

// initiate port web server
app.listen(PORT, () => {
    console.log(`Web server is running on port: ${PORT}`)
})