module.exports = app => {
  const ticket = require("../controllers/ticket.controller.js");
  const bulb = require("../controllers/bulb.controller.js");


  app.post("/ticket", ticket.create);
  app.put("/ticket", ticket.update);
  app.get("/ticket", ticket.findAllTicket);
  app.delete("/ticket/:ticketid", ticket.delete);
  app.get("/ticket/userdetails/:ticketid",ticket.finduserDetails);
  app.get("/bulbstate",bulb.findbulbstate);
  app.post("/bulbstate/:state",bulb.changeState);
  };
