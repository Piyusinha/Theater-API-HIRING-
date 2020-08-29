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
Ticket.updateById = (ticketid, timing, result) => {
  mysqlConnection.query(
    "UPDATE tikcetinfo SET timing = ?  WHERE ticket_id = ?",
    [timing, ticketid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Ticket with the id
        result({ kind: "not_found" }, null);
        return;
      }


      result(null, {Message:'Your ticket id '+ticketid+' timing is UPDATED',
                    status:200});
    }
  );
};
module.exports = Ticket;
