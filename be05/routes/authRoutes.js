const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /auth/register
// router.post('/register', authController.register);

// POST /auth/login
router.post("/login", authController.login);

// POST /auth/change-password
router.post(
  "/change-password",
  authMiddleware,
  authController.changePassword,
);

module.exports = router;
