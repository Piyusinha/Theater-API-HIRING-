const mysql = require("mysql");
const dbConfig = require("../configuration/db.config.js");
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  port:dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true
});
connection.connect(error => {
  if (error) throw error;

  console.log("Successfully connected to the database.");
});


module.exports = connection;
