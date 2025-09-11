const express = require('express');
const app = express();
const port = 3000;

const db = require('./koneksi');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware


// basic routing
app.get('/', (req, res) => {
  res.send('Berhasil terhubung ke server backend!');
});


// const sqlite3 = require('sqlite3').verbose();
// const cors = require('cors');

// app.use(express.json()); // Untuk parsing JSON body dari request
// app.use(cors()); // Mengaktifkan CORS

// // Inisialisasi Database SQLite
// const db = new sqlite3.Database('./database.db', (err) => {
//   if (err) {
//     console.error('Error opening database:', err.message);
//   } else {
//     console.log('Connected to the SQLite database.');
//     // Membuat tabel 'items' jika belum ada
//     db.run(`CREATE TABLE IF NOT EXISTS items (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT NOT NULL,
//       description TEXT
//     )`, (err) => {
//       if (err) {
//         console.error('Error creating table:', err.message);
//       }
//     });
//   }
// });

// // Endpoint API

// // 1. GET: Mendapatkan semua item
// app.get('/api/items', (req, res) => {
//   db.all('SELECT * FROM items', (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({ data: rows });
//   });
// });

// // 2. POST: Menambah item baru
// app.post('/api/items', (req, res) => {
//   const { name, description } = req.body;
//   if (!name) {
//     res.status(400).json({ error: 'Name is required' });
//     return;
//   }
//   const stmt = db.prepare('INSERT INTO items (name, description) VALUES (?, ?)');
//   stmt.run(name, description, function (err) {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.status(201).json({ id: this.lastID, name, description });
//   });
//   stmt.finalize();
// });

// // 3. DELETE: Menghapus item
// app.delete('/api/items/:id', (req, res) => {
//   const { id } = req.params;
//   db.run('DELETE FROM items WHERE id = ?', id, function (err) {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     if (this.changes === 0) {
//       res.status(404).json({ message: 'Item not found' });
//     } else {
//       res.json({ message: 'Item deleted successfully' });
//     }
//   });
// });

// Mulai server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});