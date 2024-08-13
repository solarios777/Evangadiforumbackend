const mysql2 = require("mysql2");

// create database connection
const dbConnection = mysql2.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 12,
});

module.exports = dbConnection.promise();
