module.exports = app => {
  const ticket = require("../controllers/ticket.controller.js");


  app.post("/ticket", ticket.create);
  };
