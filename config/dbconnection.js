const mysql = require("mysql2");
var db_config = require("../config/db.config");
const db_connection = mysql
  .createConnection({
    host: db_config.HOST,
    user: db_config.USER,
    database: db_config.DB,
    password: db_config.PASSWORD,
  })
  .on("error", (err) => {
    console.log("fail to connect with datbase. ", err);
  })

module.exports = db_connection;
