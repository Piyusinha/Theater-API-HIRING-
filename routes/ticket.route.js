module.exports = app => {
  const ticket = require("../controllers/ticket.controller.js");


  app.post("/ticket", ticket.create);
  app.put("/ticket/:ticketid/:newtiming", ticket.update);
  app.get("/ticket/:timing", ticket.findAllTicket);
    app.delete("/ticket/:ticketid", ticket.delete);
  };
