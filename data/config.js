const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Bringfireh88$$",
  database: "onlineshop",
});

module.exports = db;
