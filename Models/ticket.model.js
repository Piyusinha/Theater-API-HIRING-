const mysqlConnection = require("./databaseConnection.js");
var moment = require('moment');

const Ticket = function(ticket) {

  this.ticket_id = ticket.ticket_id;
  this.user_name = ticket.user_name;
  this.phone_no = ticket.phone_no;
  this.timing = ticket.timing
};

Ticket.create =(newTicket , result)=>{
  const regex = /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d\s([0-1]?[0-9]|2?[0-3]):([0-5]\d)$/g;
  if(newTicket.timing.match(regex))
  {
    var dt = new Date();
    var now=`${
    dt.getDate().toString().padStart(2, '0')}/${
    (dt.getMonth()+1).toString().padStart(2, '0')}/${
    dt.getFullYear().toString().padStart(4, '0')} ${
    dt.getHours().toString().padStart(2, '0')}:${
    dt.getMinutes().toString().padStart(2, '0')}`
    var ms = moment(newTicket.timing,"DD/MM/YYYY HH:mm").diff(moment(now,"DD/MM/YYYY HH:mm"));
    var d = moment.duration(ms);
    if(d.minutes()>0)
    {
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
            result(null,{Message:"Ticket Booked",TicketID:newTicket.ticket_id,status:201})
          }
          else {
            if(newTicket.phone_no.length>10)
            {
              console.log("ERRPHONENO");
              result({Error:ERRPHONENO},null);
            }
            else{
              console.log(err.message);
              result(err,null);
            }

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
}
    else{
        result(null,{Message:"You Can't book Ticket In Past",status:200});
    }
}
else {
    result(null,{Message:"Please Use timing format dd/mm/yyyy hh:mm",status:501});
}
};
Ticket.updateById = (ticketid, timing, result) => {
  console.log(ticketid);
  console.log(timing);
  const regex = /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d\s([0-1]?[0-9]|2?[0-3]):([0-5]\d)$/g;
  if(timing.match(regex))
  {
    var dt = new Date();
    var now=`${
    dt.getDate().toString().padStart(2, '0')}/${
    (dt.getMonth()+1).toString().padStart(2, '0')}/${
    dt.getFullYear().toString().padStart(4, '0')} ${
    dt.getHours().toString().padStart(2, '0')}:${
    dt.getMinutes().toString().padStart(2, '0')}`
    var ms = moment(timing,"DD/MM/YYYY HH:mm").diff(moment(now,"DD/MM/YYYY HH:mm"));
    var d = moment.duration(ms);
    if(d.minutes()>0)
    {
  ctquery='SELECT COUNT(*) AS ticketCount FROM tikcetinfo WHERE timing = ?';
  mysqlConnection.query(ctquery,timing,(err,rows,fields)=>{
    if(!err)
    {
      console.log(rows[0].ticketCount);
      if(rows[0].ticketCount<20)
      {
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
    }
    else{
      result(null,{Message:"You Can't Update Ticket In Past",status:200});
    }
  }
  else {
      result(null,{Message:"Please Use timing format dd/mm/yyyy hh:mm",status:501});
  }

};
Ticket.findByTiming=(timing,result)=>{
  const regex = /^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d\s([0-1]?[0-9]|2?[0-3]):([0-5]\d)$/g;
  if(timing.match(regex)){
  mysqlConnection.query("SELECT ticket_id,user_name,phone_no,expired FROM tikcetinfo WHERE timing = ?",timing,(err,res)=>{
    if (err) {
     console.log("error: ", err);
     result(err, null);
     return;
   }
   if (res.length) {

         result(null,{Tickets:res});
         return;
       }
       else {
         result({ kind: "No Ticket" }, null);
       }

  })
  }
  else{
    result(null,{Message:"Please Use timing format dd/mm/yyyy hh:mm",status:501});
  }
};
Ticket.findByTicketid=(ticketid,result)=>{
  mysqlConnection.query("SELECT * FROM tikcetinfo WHERE ticket_id = ?",ticketid,(err,res)=>{
    if (err) {
     console.log("error: ", err);
     result(err, null);
     return;
   }
   if (res.length) {

         result(null, {userdetails:res});
         return;
       }
       else {
         result({ kind: "No Ticket" }, null);
       }

  })
};
Ticket.remove = (ticketid, result) => {
  mysqlConnection.query("DELETE FROM tikcetinfo WHERE ticket_id = ?", ticketid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not Found Ticket With the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted Ticket with id: ", ticketid);
    result(null, res);
  });
};
Ticket.markTicketAsExpired=(result)=>{
  mysqlConnection.query("SELECT * FROM tikcetinfo",(err,res)=>{
    if(err)
    {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    else{
      for(var i=0;i<res.length;i++)
      {
        console.log(res[i].user_name);
      }
    }
  });
};
module.exports = Ticket;
