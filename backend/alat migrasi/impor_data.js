const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose(); // .verbose() untuk pesan error yang lebih detail

// --- KONFIGURASI ---
const DB_FILE_PATH = './database.db';
const CSV_FILE_PATH = './alat migrasi/daftar_pengguna.csv';
const SALT_ROUNDS = 10;

// 1. Inisialisasi dan koneksi ke database SQLite
// File database.db akan dibuat jika belum ada.
const db = new sqlite3.Database(DB_FILE_PATH, (err) => {
  if (err) {
    console.error('❌ Gagal terhubung ke database SQLite:', err.message);
  } else {
    console.log('✅ Berhasil terhubung ke database SQLite.');
  }
});

// 2. Membuat tabel 'users' jika belum ada
// db.serialize memastikan perintah dieksekusi secara berurutan
db.serialize(() => {
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      nama TEXT,
      nip TEXT,
      email TEXT,
      fotolink TEXT,
      grup TEXT
    )
  `;
  db.run(createTableSql, (err) => {
    if (err) {
      console.error("❌ Gagal membuat tabel 'users':", err.message);
    } else {
      console.log("✔️ Tabel 'users' siap digunakan.");
      // Setelah tabel siap, mulai proses CSV
      prosesCSV();
    }
  });
});

function prosesCSV() {
    const results = [];
    fs.createReadStream(CSV_FILE_PATH)
        .pipe(csv({ separator: ';' })) // Sesuaikan separator jika perlu
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            console.log(`📑 Selesai membaca file CSV, ditemukan ${results.length} record.`);

            const insertSql = `INSERT INTO users (id, username, password, role, nama, nip, email, fotolink, grup) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

            for (const record of results) {
                try {
                    // Hash password
                    const hashedPassword = await bcrypt.hash(record.password, SALT_ROUNDS);

                    // Prepare data for insert
                    const params = [record.id, record.username, hashedPassword, record.role, record.nama, record.nip, record.email, record.fotolink, record.grup];

                    // Insert into database
                    await new Promise((resolve, reject) => {
                        db.run(insertSql, params, function(err) {
                            if (err) reject(err);
                            console.log(`✔️ Berhasil menyimpan user: ${record.username} dengan ID: ${this.lastID}`);
                            resolve(this);
                        });
                    });

                } catch (dbError) {
                    console.error(`❌ Gagal memproses record: ${record.username}. Error:`, dbError.message);
                }
            }

            // Close database connection
            db.close((err) => {
                if (err) {
                    console.error('❌ Gagal menutup koneksi database:', err.message);
                } else {
                    console.log('🎉 Semua proses impor selesai. Koneksi database ditutup.');
                }
            });
        })
        .on('error', (err) => {
            console.error("❌ Terjadi error saat membaca file CSV:", err);
        });
}
