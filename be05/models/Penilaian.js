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
  // Mengambil data rata-rata NILAI per personil yang dinilai
  getByIdDinilai: (id_dinilai) => {
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
  //Mengambil komentar atau kualitatif per personil yang dinilai
  getKualitatifByIdDinilai: (id_dinilai) => {
    return new Promise((resolve, reject) => {
      const dataQuery = `
            SELECT id_penilaian, kualitatif
            FROM rupa_senja.pasangan_penilaian
            where id_dinilai = ?
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
  // Menyimpan atau memperbarui data penilaian
  save: (penilaianData) => {
    return new Promise((resolve, reject) => {
      const rik_renc = penilaianData.NilaiRikRenc;
      const rik_laks = penilaianData.NilaiRikLaks;
      const rik_lap = penilaianData.NilaiRikLap;
      const pelayanan = penilaianData.NilaiPelayanan;
      const akuntabel = penilaianData.NilaiAkuntabel;
      const kompeten = penilaianData.NilaiKompeten;
      const harmoni = penilaianData.NilaiHarmoni;
      const loyal = penilaianData.NilaiLoyal;
      const adaptif = penilaianData.NilaiAdaptif;
      const kolaboratif = penilaianData.NilaiKolaboratif;
      const kualitatif = penilaianData.NilaiKualitatif;
      const status = 1; // Menandai penilaian sudah selesai
      const id_penilaian = penilaianData.id_penilaian;

      const dataQuery = `
      UPDATE rupa_senja.pasangan_penilaian SET
      rik_renc = ?,
      rik_laks = ?,
      rik_lap = ?,
      pelayanan = ?,
      akuntabel = ?,
      kompeten = ?,
      harmoni = ?,
      loyal = ?,
      adaptif = ?,
      kolaboratif = ?,
      kualitatif = ?,
      status = ?
      WHERE id_penilaian = ?;
      `;

      connection.query(
        dataQuery,
        [
          rik_renc,
          rik_laks,
          rik_lap,
          pelayanan,
          akuntabel,
          kompeten,
          harmoni,
          loyal,
          adaptif,
          kolaboratif,
          kualitatif,
          status,
          id_penilaian,
        ],
        (err, results) => {
          if (err) {
            return reject(err);
          }
          resolve(results);
        },
      );
    });
  },
  // Mengambil Nilai Kelompok sesuai grupnya
  getNilaiKelompokByGrup: (grup) => {
    return new Promise((resolve, reject) => {
      const dataQuery = `
            SELECT dinilai
            , id_dinilai
            , avg(rik_renc) rik_renc
            , avg(rik_laks) rik_laks
            , avg(rik_lap) rik_lap
            , avg(pelayanan) pelayanan
            , avg(akuntabel) akuntabel
            , avg(kompeten) kompeten
            , avg(harmoni) harmoni
            , avg(loyal) loyal
            , avg(adaptif) adaptif
            , avg(kolaboratif) kolaboratif
            FROM rupa_senja.pasangan_penilaian p
            join (SELECT id, grup
            FROM rupa_senja.users
            ) u on p.id_dinilai = u.id
            where u.grup = ?
            -- and p.status = 1
            group by dinilai, id_dinilai
            order by id_dinilai;
            `;
      connection.query(dataQuery, [grup], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
  // Mengambil Progress Penilaian per Penilai
  getProgressPenilaianAll: () => {
    return new Promise((resolve, reject) => {
      const dataQuery = `
            SELECT id_penilai, penilai
            , count(*) total_menilai
            , sum(case when status = 0 then 1 else 0 end) blm_menilai
            , sum(case when status = 1 then 1 else 0 end) sdh_menilai
            FROM rupa_senja.pasangan_penilaian
            group by penilai, id_penilai
            order by id_penilai;
            `;
      connection.query(dataQuery, [], (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      });
    });
  },
  // Mereset Penilaian atas seluruh penilaian dari id_penilai
  resetPenilaianByIdPenilai: (id_penilai) => {
    return new Promise((resolve, reject) => {
      const dataQuery = `
            UPDATE rupa_senja.pasangan_penilaian SET
            status = 0
            WHERE id_penilai = ?;
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
