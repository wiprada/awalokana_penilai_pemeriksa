const User = require("../models/User.js");

// Get all users
const getAllPegawai = async (req, res) => {
  try {
    const users = await User.getPegawai();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
// Get all users full data
const getAllUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
// Reset user password (admin only)
const resetPassword = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.resetPassword(userId);
    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to reset password" });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

module.exports = {
  getAllPegawai,
  getAllUsers,
  resetPassword,
  getUserById,
};
