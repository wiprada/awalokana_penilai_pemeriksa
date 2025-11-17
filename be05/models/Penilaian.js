const connection = require("../koneksi.js");

const Penilaian = {
  // Memngambil semua data penilaian setelah di rata-tata
  getAll: () => {
    return new Promise((resolve, reject) => {
      const dataQuery = `
            SELECT p.id_dinilai
, p.dinilai
, u.grup
, avg(p.rik_renc) rik_renc
, avg(p.rik_laks) rik_laks 
, avg(p.rik_lap) rik_lap
, avg(p.pelayanan) pelayanan
, avg(p.akuntabel) akuntabel
, avg(p.kompeten) kompeten
, avg(p.harmoni) harmoni
, avg(p.loyal) loyal
, avg(p.adaptif) adaptif
, avg(p.kolaboratif) kolaboratif
FROM pasangan_penilaian p
left join users u on p.id_dinilai = u.id
group by p.id_dinilai , p.dinilai, u.grup 
            `;
      connection.query(dataQuery, [], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
  // Mengambil data rata-rata penilai per personil yang dinilai
  getbyid: (id_dinilai) => {
    return new Promise((resolve, reject) => {
      const dataQuery = `
            SELECT p.id_dinilai
, p.dinilai
, u.grup
, avg(p.rik_renc) rik_renc
, avg(p.rik_laks) rik_laks 
, avg(p.rik_lap) rik_lap
, avg(p.pelayanan) pelayanan
, avg(p.akuntabel) akuntabel
, avg(p.kompeten) kompeten
, avg(p.harmoni) harmoni
, avg(p.loyal) loyal
, avg(p.adaptif) adaptif
, avg(p.kolaboratif) kolaboratif
FROM pasangan_penilaian p
left join users u on p.id_dinilai = u.id
where p.id_dinilai = ?
group by p.id_dinilai , p.dinilai, u.grup 
            `;
      connection.query(dataQuery, [id_dinilai], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = Penilaian;
