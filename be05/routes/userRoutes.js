const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// GET all user names
router.get("/names", userController.getAllPegawai);

module.exports = router;
