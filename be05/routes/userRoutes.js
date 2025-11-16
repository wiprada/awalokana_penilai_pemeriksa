const express = require("express");
const router = express.Router();
const connection = require("../koneksi.js");

// This is a placeholder and assumes you have a 'users' table
// GET /users/
router.get("/", (req, res) => {
  const query = "SELECT * FROM users"; // Replace 'users' with your table name
  connection.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({
        error: error.message,
      });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
