const connection = require("../koneksi.js");

const UserVote = {
  save: (vote) => {
    return new Promise((resolve, reject) => {
      // Assuming you have a mechanism to prevent duplicate votes,
      // e.g., a unique constraint on (id_user, id_pengetahuan) in your DB.
      // For this example, we'll assume the user ID is '1'.
      // In a real application, you would get this from the authenticated user's session or token.
      const query =
        "INSERT INTO user_vote (voter, id_pengetahuan) VALUES (?, ?)";
      const values = [vote.id_user, vote.id_pengetahuan];
      connection.query(query, values, (err, results) => {
        if (err) {
          // Handle duplicate entry error gracefully if a user tries to vote twice
          if (err.code === "ER_DUP_ENTRY") {
            return reject(new Error("User has already voted for this item."));
          }
          return reject(err);
        }
        return resolve(results);
      });
    });
  },
  checkExistingVote: (id_user, id_pengetahuan) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT COUNT(*) AS voteCount FROM user_vote WHERE voter = ? AND id_pengetahuan = ?";
      const values = [id_user, id_pengetahuan];
      connection.query(query, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        // Resolve with true if voteCount > 0, otherwise false
        return resolve(results[0].voteCount > 0);
      });
    });
  },
};

module.exports = UserVote;
