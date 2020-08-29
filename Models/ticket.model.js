const mysqlConnection = require("./databaseConnection.js");
const Ticket = function(ticket) {

  this.ticket_id = ticket.ticket_id;
  this.user_name = ticket.user_name;
  this.phone_no = ticket.phone_no;
  this.timing = ticket.timing
};

Ticket.create =(newTicket , result)=>{
  ctquery='SELECT COUNT(*) AS ticketCount FROM tikcetinfo WHERE timing = ?';
  bookticketquery='INSERT INTO tikcetinfo SET ?';
  mysqlConnection.query(ctquery,newTicket.timing,(err,rows,fields)=>{
    if(!err)
    {
      console.log(rows[0].ticketCount);
      if(rows[0].ticketCount<20)
      {
        mysqlConnection.query(bookticketquery,newTicket,(err,rows,fields)=>{
          if(!err)
          {
            result(null,{Message:"Ticket Booked",status:200})
          }
          else {
            console.log(err.message);
          result(err,null);
          }
        })

      }
      else {
            result(null,{  Message:"Ticket Limit Reached! Please Select Another TimeSlot",
              Status:200})

      }
    }
    else {
      console.log(err.message);
      result(err,null);
    }
  })
};
module.exports = Ticket;
