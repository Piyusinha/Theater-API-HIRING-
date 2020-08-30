const Ticket = require("../Models/ticket.model.js");
const isEmpty = require('lodash.isempty');
//create new Ticket
exports.create = (req, res) => {
  if (isEmpty(req.body)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });


  }

  else{// Create a Ticket
  if(isEmpty(req.body.user_name))
  {
    res.status(400).send({
      error:{
      InvalidField: {
        user_name:"required"
      }
    }
    });
    return;
  }
  if(isEmpty(req.body.phone_no))
  {
    res.status(400).send({
      error:{
      InvalidField: {
        phone_no:"required"
      }
    }
    });
    return;
  }
  if(isEmpty(req.body.timing))
  {
    res.status(400).send({
      error:{
      InvalidField: {
        timing:"required"
      }
    }
    });
    return;
  }
  const ticket = new Ticket({
    user_name: req.body.user_name,
    phone_no: req.body.phone_no,
    timing: req.body.timing,
    ticket_id:req.body.phone_no+Date.now()
  });

  // Save Ticket in the database
  Ticket.create(ticket, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Ticket."
      });
    else res.send(data);
  });
}
};
//Update Ticket timing
exports.update = (req, res) => {
  if (isEmpty(req.body)) {
    res.status(400).send({
      message: "Content can not be empty!"
    });

    return;
  }
  if(isEmpty(req.body.ticketid))
  {
    res.status(400).send({
      error:{
      InvalidField: {
        ticketid:"required"
      }
    }
    });
      return;
  }
  if(isEmpty(req.body.timing))
  {
    res.status(400).send({
      error:{
      InvalidField: {
        timing:"required"
      }
    }
    });
      return;
  }
  Ticket.updateById(
    req.body.ticketid,
    req.body.timing,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ticket with id ${req.body.ticketid}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Ticket with id " + req.body.ticketid
          });
        }
      } else res.send(data);
    }
  );
};
//FIND Ticket of particulartime
exports.findAllTicket=(req,res)=>{
  if(isEmpty(req.body))
  {
    res.status(400).send({
      message: "Content can not be empty!"
    });

      return;
  }
  if(isEmpty(req.body.timing))
  {
    res.status(400).send({
      error:{
      InvalidField: {
        timing:"required"
      }
    }
    });
      return;
  }
  Ticket.findByTiming(
    req.body.timing,
    (err,data)=>{
      if (err) {
        if (err.kind === "No Ticket") {
          res.status(404).send({
            message: 'No Ticket Found'
          });
        } else {
          res.status(500).send({
            message: "Error"
          });
        }
      }
      else{
        res.send(data);
      }
  }
  );
};
//Delete Ticket
exports.delete = (req, res) => {
  if(isEmpty(req.params.ticketid))
  {
    res.status(400).send({
      error:{
      InvalidParameter: {
        ticketid:"required"
      }
    }
    });
      return;
  }
  Ticket.remove(req.params.ticketid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Ticket with id ${req.params.ticketid}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Ticket with id " + req.params.ticketid
        });
      }
    } else res.send({ message: `Ticket was deleted successfully!` });
  });
};
exports.finduserDetails=(req,res)=>{
  Ticket.findByTicketid(
    req.params.ticketid,
    (err,data)=>{
      if (err) {
        if (err.kind === "No Ticket") {
          res.status(404).send({
            message: 'No User Found'
          });
        } else {
          res.status(500).send({
            message: "Error"
          });
        }
      }
      else{
        res.send(data);
      }
  }
  );
};
