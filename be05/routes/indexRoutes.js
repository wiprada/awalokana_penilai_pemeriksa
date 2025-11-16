const express = require("express");
const router = express.Router();

// Root endpoint
router.get("/", (req, res) => {
  res.status(200).json({
    message: "API is up and running.",
    pesan: "Anda telah berhasil mengakses endpoint root.",
  });
});

module.exports = router;
