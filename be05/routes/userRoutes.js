const express = require("express");
const userController = require("../controllers/userController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// GET all user names
router.get("/names", userController.getAllPegawai);
// GET user by ID
router.get("/user/:id", userController.getUserById);
// GET all users full data
router.get("/", userController.getAllUsers);
// Reset user password (admin only) - to be implemented
router.post("/reset-password/:id", verifyToken, userController.resetPassword);

module.exports = router;
