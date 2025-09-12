const express = require('express');
const app = express();
const port = 3000;

const db = require('./koneksi');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const bcrypt = require('bcryptjs');
const saltRounds = 18;


// Middleware


// basic routing
app.get('/', (req, res) => {
  res.send('Hello World! This is the backend server.');
});

// login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM users WHERE username = ?';
  db.get(sql, [username], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    bcrypt.compare(password, row.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!result) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      // On successful login, send dashboard URL for this user id
      res.json({ 
        message: 'Login successful', 
        user: { id: row.id, username: row.username, nama: row.nama },
        redirect: `/dashboard/${row.id}`
      });
    });
  });
});

// route untuk dashboard user
app.get('/dashboard/:id', (req, res) => {
  const userId = req.params.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.get(sql, [userId], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user: row });
  });
});



// ambil daftar user
app.get('/user', (req, res) => {
  const sql = 'SELECT * FROM users ORDER BY id';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      status: 'Berhasil terhubung ke server backend!',
      users: rows}
    );
  });

  console.log("Ada Permintaan dari Front End")
});




// Mulai server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});