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
  // Mengambil data penilaian per personil penilai
  getByIdPenilai: (id_penilai) => {
    return new Promise((resolve, reject) => {
      const dataQuery = `
            SELECT p.id_st
            , p.no_st
            , s.perihalst
            , s.tglst
            , s.entabr
            , p.penilai
            , p.id_penilai
            , p.peran_penilai
            , p.dinilai
            , p.id_dinilai
            , p.peran_dinilai
            , p.rik_renc
            , p.rik_laks
            , p.rik_lap
            , p.pelayanan
            , p.akuntabel
            , p.kompeten
            , p.harmoni
            , p.loyal
            , p.adaptif
            , p.kolaboratif
            , p.kualitatif
            , p.status
            , p.id_penilaian
            FROM rupa_senja.pasangan_penilaian p
            LEFT JOIN rupa_senja.st s ON p.id_st = s.id
            where p.status = 0
            and p.id_penilai = ?
            ORDER BY p.id_st, p.id_dinilai
            `;
      connection.query(dataQuery, [id_penilai], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
  // Mengambil data penugasan berdasarkan id_penilai
  getPenugasanByIdPenilai: (id_penilai) => {
    return new Promise((resolve, reject) => {
      const dataQuery = `
            select a.id_st, s.no_st, s.entabr, s.tglst, s.perihalst
            , a.blm_nilai, a.sdh_nilai
            , case when a.blm_nilai = 0 then false else true end status
            from (SELECT id_st
            , id_penilai
            , sum(case when status = 0 then 1 else 0 end) blm_nilai
            , sum(case when status = 1 then 1 else 0 end) sdh_nilai
            FROM rupa_senja.pasangan_penilaian
            where id_penilai = ?
            group by id_st, id_penilai) a
            left join rupa_senja.st s on s.id = a.id_st
            `;
      connection.query(dataQuery, [id_penilai], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
};

module.exports = Penilaian;
