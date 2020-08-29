const Ticket = require("../Models/ticket.model.js");
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Ticket
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
};
exports.update = (req, res) => {
  Ticket.updateById(
    req.params.ticketid,
    req.params.newtiming,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Ticket with id ${req.params.ticketid}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Ticket with id " + req.params.ticketid
          });
        }
      } else res.send(data);
    }
  );
};
exports.findAllTicket=(req,res)=>{
  Ticket.findByTiming(
    req.params.timing,
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
exports.delete = (req, res) => {
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
