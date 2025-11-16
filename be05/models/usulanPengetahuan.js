const connection = require("../koneksi.js");

const UsulanPengetahuan = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const dataQuery = `
          SELECT u.id, u.pengusul, u.narasumber, u.pengetahuan, v.jml_vote 
FROM rupa_senja.usulan_pengetahuan u
left join (SELECT id_pengetahuan, count(*) jml_vote
FROM rupa_senja.user_vote
group by id_pengetahuan 
) v on v.id_pengetahuan = u.id
where status = 0
order by v.jml_vote desc
          `;
      connection.query(dataQuery, [], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve({
          data: results,
        });
      });
    });
  },
  getActive: (page = 1) => {
    return new Promise((resolve, reject) => {
      const limit = 10;
      const offset = (page - 1) * limit;
      const dataQuery =
        "SELECT id, pengusul, narasumber, pengetahuan FROM usulan_pengetahuan WHERE status = 0 LIMIT ? OFFSET ?";
      const countQuery =
        "SELECT COUNT(*) as total FROM usulan_pengetahuan WHERE status = 0";

      connection.query(countQuery, (err, countResult) => {
        if (err) {
          return reject(err);
        }
        const total = countResult[0].total;
        connection.query(dataQuery, [limit, offset], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve({
            data: results,
            total: total,
            page: parseInt(page),
            limit: limit,
          });
        });
      });
    });
  },
  getDone: (page = 1) => {
    return new Promise((resolve, reject) => {
      const limit = 10;
      const offset = (page - 1) * limit;
      const dataQuery =
        "SELECT id, pengusul, narasumber, pengetahuan FROM usulan_pengetahuan WHERE status = 1 LIMIT ? OFFSET ?";
      const countQuery =
        "SELECT COUNT(*) as total FROM usulan_pengetahuan WHERE status = 1";

      connection.query(countQuery, (err, countResult) => {
        if (err) {
          return reject(err);
        }
        const total = countResult[0].total;
        connection.query(dataQuery, [limit, offset], (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve({
            data: results,
            total: total,
            page: parseInt(page),
            limit: limit,
          });
        });
      });
    });
  },
  findById: (id) => {
    return new Promise((resolve, reject) => {
      const query =
        "SELECT id, pengusul, narasumber, pengetahuan FROM usulan_pengetahuan WHERE id = ?";
      connection.query(query, [id], (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results[0]);
      });
    });
  },
  save: (usulan) => {
    return new Promise((resolve, reject) => {
      const query =
        "INSERT INTO usulan_pengetahuan (pengusul, narasumber, pengetahuan) VALUES (?, ?, ?)";
      const values = [usulan.pengusul, usulan.narasumber, usulan.pengetahuan];
      connection.query(query, values, (err, results) => {
        if (err) {
          return reject(err);
        }
        return resolve(results);
      });
    });
  },
  findByIdAndUpdate: (id, usulan) => {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE usulan_pengetahuan SET pengusul = ?, narasumber = ?, pengetahuan = ? WHERE id = ?";
      const values = [
        usulan.pengusul,
        usulan.narasumber,
        usulan.pengetahuan,
        id,
      ];
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
