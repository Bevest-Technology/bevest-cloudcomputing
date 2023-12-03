// call library
const express = require('express');
require('dotenv').config()

//define web server
const app = express()

//define port

// initiate index endpoint
app.get('/', (req, res) => {
    res.send("Ini halaman endpoint index")
})

// initiate port web server
PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Web server is running on port: ${PORT}`)
})