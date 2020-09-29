const mysqlConnection = require("./databaseConnection.js");
var moment = require('moment');


const Bulb = function(buld)
{
  this.bulb=bulb.buld,
  this.id=bulb.id
};
Bulb.findByBulb=(result)=>{
  mysqlConnection.query("SELECT * FROM iot_project WHERE id = 3304",(err,res)=>{
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {

      result(null, {state:res[0].bulb});
      return;
    }
    else {
      result({ kind: "No Ticket" }, null);
    }

  })
};
Bulb.updateState = (state, result) => {
  mysqlConnection.query(
    "UPDATE iot_project SET bulb = ?  WHERE id = 3304",
    [state],
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


      result(null, {Message:'StateChange',
                    status:200});
    }
  );

};


module.exports = Bulb;
