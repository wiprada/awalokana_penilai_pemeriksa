const connection = require("../koneksi.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// NOTE: Store this secret in an environment variable (.env file) in a real application
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  const findUserQuery = "SELECT * FROM users WHERE username = ?";
  connection.query(findUserQuery, [username], async (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const user = results[0];

    // Compare password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Create and sign a JWT
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.peran,
        grup: user.grup,
        nama: user.nama,
      },
      JWT_SECRET,
      {
        expiresIn: "1h", // Token expires in 1 hour
      },
    );

    res.status(200).json({
      message: "Logged in successfully.",
      token: token,
      user: {
        id: user.id,
        username: user.username,
        role: user.peran,
        grup: user.grup,
        nama: user.nama,
      },
    });
  });
};

exports.changePassword = (req, res) => {
  // The user's identity is confirmed via JWT token middleware
  const userId = req.user.id;
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({
      message: "Old password and new password are required.",
    });
  }

  const findUserQuery = "SELECT * FROM users WHERE id = ?";
  connection.query(findUserQuery, [userId], async (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const user = results[0];

    // Compare old password with the hashed password in the database
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid old password." });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";
    connection.query(
      updatePasswordQuery,
      [hashedNewPassword, user.id],
      (error, results) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: "Password changed successfully." });
      },
    );
  });
};
