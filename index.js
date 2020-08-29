const mysql =require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var createError = require('http-errors');
var mysqlConnection = require("./Models/databaseConnection.js");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  require("./routes/ticket.route.js")(app);

  app.listen(3000, () => console.log('API  is runnig at port no : 3000'));


module.exports= app;
