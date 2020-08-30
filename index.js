const mysql =require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
var app = express();
var createError = require('http-errors');
var mysqlConnection = require("./Models/databaseConnection.js");
var cron = require('node-cron');
const ticket = require("./controllers/ticket.controller.js");
var moment = require('moment');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  require("./routes/ticket.route.js")(app);

  app.listen(3000, () => console.log('API  is runnig at port no : 3000'));
  function markTicketExpired() {
    var dt = new Date();
    var now=`${
    dt.getDate().toString().padStart(2, '0')}/${
    (dt.getMonth()+1).toString().padStart(2, '0')}/${
    dt.getFullYear().toString().padStart(4, '0')} ${
    dt.getHours().toString().padStart(2, '0')}:${
    dt.getMinutes().toString().padStart(2, '0')}`


    mysqlConnection.query("SELECT * FROM tikcetinfo",(err,res)=>{
      if(err)
      {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      else{
        var expiredTicketid=[];
        for(var i=0;i<res.length;i++)
        {
          var ms = moment(now,"DD/MM/YYYY HH:mm").diff(moment(res[i].timing,"DD/MM/YYYY HH:mm"));
          var d = moment.duration(ms);
          console.log(d.hours());
          if(d.hours()>=8)
          {
              expiredTicketid.push(res[i].ticket_id);
          }
        }
        mysqlConnection.query("UPDATE tikcetinfo SET expired = ?  WHERE ticket_id IN (?)",[1,expiredTicketid],(err,res)=>{
          if(!err)
          {
            console.log("Ticket Updated");
          }
          else{

          }

        })
      }
    });
  }

  cron.schedule('*/10 * * * * *', ()=> {
     console.log('running a task every 5 seconds');
     markTicketExpired();
  });


module.exports= app;
