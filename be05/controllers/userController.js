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

module.exports = {
  getAllPegawai,
};
