const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Tidak dapat terkoneksi ke database', err);
    } else {
        console.log('Berhasil terkoneksi ke database SQLite database.db');
    }
});

module.exports = db;