const connection = require("../koneksi.js");

const UsulanPengetahuan = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      let dataQuery = `
          SELECT a.id, a.pengusul, a.narasumber, a.pengetahuan, b.jml_vote
          FROM usulan_pengetahuan a
          LEFT JOIN (
          SELECT id_pengetahuan, COUNT(*) AS jml_vote
          FROM user_vote
          GROUP BY id_pengetahuan
          ) b ON a.id = b.id_pengetahuan
          ORDER BY b.jml_vote DESC
          `;

      const params = [];
      connection.query(dataQuery, params, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({
          data: results,
        });
      });
    });
  },
  save: (usulan) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO usulan_pengetahuan (pengusul, narasumber, pengetahuan, status) VALUES (?, ?, ?, 0)";
      const values = [usulan.pengusul, usulan.narasumber, usulan.pengetahuan];
      connection.query(query, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  },
  setDone: (id) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE usulan_pengetahuan SET status = 1 WHERE id = ?";
      const values = [id];
      connection.query(query, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  },
};

module.exports = UsulanPengetahuan;
