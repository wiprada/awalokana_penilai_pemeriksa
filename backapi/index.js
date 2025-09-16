const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = require('./koneksi'); // Import the database connection
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// endpoint: test
app.get('/', (req, res) => {
    res.send('API is running');
});

// endpoint login
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';

    db.get(query, [username], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!row) {
            return res.status(401).json({ message: 'Invalid username' });
        }

        // Compare password with hashed password in database
        bcrypt.compare(password, row.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Internal server error' });
            }

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid password' });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: row.id, username: row.username },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            // Successful login
            res.json({ message: 'Login successful', user: row, token, role: row.role, nama: row.nama });
        });
    });
});

// endpoint: usulan_pengetahuan
app.get('/pengetahuan', (req, res) => {
    const query = 'SELECT * FROM usulan_pengetahuan ORDER BY vote DESC';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(rows);
    });
});

// endpoint: mengambil seluruh data user
app.get('/api/users', (_, res) => {
    const query = 'SELECT id, username, nama, nip, fotolink, grup FROM users ORDER BY id'; // Exclude password from the response
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(rows);
    });
});

// endpoint: mengambil seluruh data tugas
app.get('/api/tugas', (_, res) => {
    const query = 'SELECT * FROM surat_tugas ORDER BY tglst, id';
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(rows);
    });
});

// endpoint: mengambil user tertentu berdasarkan username
app.get('/api/user/:username', (req, res) => {
    const username = req.params.username;
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ message: 'Username parameter is required' });
    }
    const query = 'SELECT id, username, nama, nip, fotolink, grup FROM users WHERE username = ?'; // Exclude password from the response 
    db.get(query, [username], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(row);
    });
});

// endpoint: mengambil nilai user tertentu berdasarkan nama
app.get('/api/nilai/:nama', (req, res) => {
    const nama = req.params.nama;
    if (!nama || typeof nama !== 'string' || nama.trim() === '') {
        return res.status(400).json({ message: 'Nama parameter is required' });
    }
    const query = `
    SELECT dinilai AS nama,
    AVG(rikrenc) AS perencanaan,
    AVG(riklaks) AS pelaksanaan,
    AVG(riklap) AS pelaporan,
    AVG(pelayanan) AS pelayanan,
    AVG(akuntabel) AS akuntabilitas,
    AVG(kompeten) AS kompetensi,
    AVG(harmoni) AS harmonis,
    AVG(adaptif) AS adaptif,
    AVG(kolaboratif) AS kolaboratif
    FROM penilaian 
    WHERE dinilai = ? 
    GROUP BY dinilai
    ` 
    db.get(query, [nama], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(row);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
