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
