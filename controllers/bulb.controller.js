const Bulb = require("../Models/bulbmodel.js");
const isEmpty = require('lodash.isempty');
exports.findbulbstate=(req,res)=>{
  Bulb.findByBulb(
    (err,data)=>{
      if (err) {
      console.log(err.message);
      }
      else{
        res.send(data);
      }
  }
  );
};
exports.changeState=(req,res)=>{
  Bulb.updateState(
    req.params.state,
    (err,data)=>{
      if (err) {
      console.log(err.message);
      }
      else{
        res.send(data);
      }
  }
  );
};
