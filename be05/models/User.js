const connection = require("../koneksi.js");

const User = {
  getPegawai: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT nama FROM users"; // Replace 'users' with your table name
      connection.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({
          pegawai: results.map((row) => row.nama),
        });
      });
    });
  },
  // mengambil data lengkap atas seluruh pegawai
  getAllUsers: () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users where peran <> 'admin' order by id"; // Replace 'users' with your table name
      connection.query(query, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
  // Reset password user by ID (admin only)
  resetPassword: (id) => {
    return new Promise((resolve, reject) => {
      const getUsernameQuery = "SELECT username FROM users WHERE id = ?";
      connection.query(getUsernameQuery, [id], (err, results) => {
        if (err) {
          console.error("Error fetching username:", err);
          return reject(err);
        }
        if (results.length === 0) {
          return reject(new Error("User not found"));
        }

        const username = results[0].username;
        const newPassword = require("bcryptjs").hashSync(username, 10);

        const updatePasswordQuery = "UPDATE users SET password = ? WHERE id = ?";
        connection.query(
          updatePasswordQuery,
          [newPassword, id],
          (err, updateResult) => {
            if (err) {
              console.error("Error updating password:", err);
              return reject(err);
            }
            resolve(updateResult);
          }
        );
      });
    });
  },
  // Get user by ID
  getUserById: (id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users WHERE id = ?";
      connection.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        if (results.length === 0) {
          return resolve(null);
        }
        resolve(results[0]);
      });
    });
  },
};
module.exports = User;
