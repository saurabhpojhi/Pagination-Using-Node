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


// http://localhost:3000/api/usersdata?pageNo=1&size=10

router.get('/usersdata',(req,res) => {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
         users.find({},{},query,function(err,data) {
          // Mongo command to fetch all data from collection.
              if(err) {
                  response = {"error" : true,"message" : "Error fetching data"};
              } else {
                  response = {"error" : false,"message" : data};
              }
              res.json(response);
          });
  })


// http://localhost:3000/api/usersdata?pageNo=1&size=5

  router.get('/users',(req,res) => {
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
    var query = {}
    if(pageNo < 0 || pageNo === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response)
    }
    query.skip = size * (pageNo - 1)
    query.limit = size
    // Find some documents
    users.count({},function(err,totalCount) {
               if(err) {
                 response = {"error" : true,"message" : "Error fetching data"}
               }
               users.find({},{},query,function(err,data) {
                // Mongo command to fetch all data from collection.
              if(err) {
                  response = {"error" : true,"message" : "Error fetching data"};
              } else {
                  var totalPages = Math.ceil(totalCount / size)
                  response = {"error" : false,"message" : data,"pages": totalPages};
              }
              res.json(response);
           });
         })
  })



//server.listen(port);
app.listen((port),()=>{
    console.log(`Server is Running ${port}`)
});


app.use('/api',router)

module.exports =app;