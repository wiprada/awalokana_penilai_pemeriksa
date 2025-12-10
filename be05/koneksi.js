const mysql = require("mysql2");

// Create the connection to the database
const connection = mysql.createConnection({
  host: "127.0.0.1",
  // port: 3306,
  port: 3307,
  user: "root", // replace with your database user
  password: "", // replace with your database password
  database: "rupa_senja",
});

// Connect to the database
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Successfully connected to the database.");
});

module.exports = connection;
