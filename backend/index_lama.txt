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
const e = require('express');
const saltRounds = 18;


// Middleware


// basic routing
app.get('/', (req, res) => {
  res.send('Hello World! This is the backend server.');
});

// login route
app.post('/login', (req, res) => {
  // menerima data dari isian formulir login di frontend data yang diterima adalah email dan password
  const { email, password } = req.body;

  const { email, password } = req.body;
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.get(sql, [email], (err, row) => {
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
      // add if based on user role
      if (row.role === 'Admin') {
        return res.json({ 
          message: 'Login successful', 
          user: { id: row.id, nama: row.nama },
          redirect: '/admin'
        });
      } else if (row.role === 'Struktural') {
        return res.json({ 
          message: 'Login successful', 
          user: { id: row.id, nama: row.nama, grup: row.grup },
          redirect: `/struktural/${row.grup}`
        });
      } else if (row.role === 'Fungsional Pemeriksa') {
        return res.json({ 
          message: 'Login successful', 
          user: { id: row.id, nama: row.nama, grup: row.grup, foto: row.fotolink },
          redirect: `/dashboard/${row.id}`
        });
      }
    });
  });
});

// endpoint admin ambil data user
app.get('/admin', (req, res) => {
  const {nama} = req.body;
  const sql = 'SELECT * FROM users ORDER BY id';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      status: ` ${nama} Berhasil terhubung ke Data Admin!`,
      users: rows
    });
  });

  console.log("Ada Permintaan dari Front End")
  // Tambahkan logika tambahan jika diperlukan
});

// endpoint struktural
app.get('/struktural/:grup', (req, res) => {
  const grup = req.params.grup;
  const sql = 'SELECT * FROM users WHERE grup = ? ORDER BY id';
  db.all(sql, [grup], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      status: `Berhasil terhubung ke Data Struktural untuk grup ${grup}!`,
      users: rows}
    );
  });
});

// route untuk dashboard user
app.get('/dashboard/:nama', (req, res) => {
  const userId = req.params.nama;
  const sql = `SELECT AA.id_tugas, DD.perihalst,
  BB.id AS id_penilai, AA.penilai AS nama_penilai,
  CC.id AS id_dinilai, AA.dinilai AS nama_dinilai 
  FROM (SELECT id_tugas, penilai, dinilai 
  FROM penilaian 
  WHERE penilai = ?) AS AA
  LEFT JOIN users AS BB ON AA.penilai = BB.nama
  LEFT JOIN users AS CC ON AA.dinilai = CC.nama
  LEFT JOIN (SELECT id_tugas, perihalst FROM penugasan GROUP BY id_tugas, perihalst) AS DD ON AA.id_tugas = DD.id_tugas
  `;
  db.all(sql, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!rows) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ data: rows });
  
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

// mengambil usulan berbagi pengetahuan
app.get('/pengetahuan', (req, res) => {
  const sql = `
  SELECT *
  FROM usulan_pengetahuan
  `;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.json({error: err.message});
    }
    res.json({
      status: 'Berhasil Mengambil Data Pengetahuan',
      hasil: rows
    })
  })
  console.log('Ada Permintaan dari FrontEnd')
});


// Mulai server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});