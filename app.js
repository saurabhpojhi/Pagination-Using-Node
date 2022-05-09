const express = require('express');
const mongoose = require('mongoose');
const users = require('./models/users');
const app = express()
const router = express.Router()

const port = 3000;

// connnect database 
mongoose.connect('mongodb://localhost:27017/Pagination_Test')
.then(conn=>{
    console.log('MongoDB connected')
})
.catch(error=>{
    console.log("Error:"+ error.Message)
})







//server.listen(port);
app.listen((port),()=>{
    console.log(`Server is Running ${port}`)
});


app.use('/api',router)

module.exports =app;