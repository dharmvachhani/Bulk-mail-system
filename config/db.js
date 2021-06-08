const mysql = require("mysql");

var connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "bulk-mailer",
});

module.exports = connection;
