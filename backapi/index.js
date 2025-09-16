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
                { expiresIn: '2h' }
            );

            // Successful login
            res.status(200).json({ message: 'Login successful', user: row, token, role: row.role, nama: row.nama, grup: row.grup, id: row.id});
        });
    });
});

// --- ADMIN ---

// endpoint: usulan_pengetahuan selesai
app.patch('/pengetahuan/selesai', (req, res) => {
    const { id, by } = req.body;
    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    const query = 'UPDATE usulan_pengetahuan SET status = 1, doneby = ? WHERE id = ?';
    db.run(query, [by, id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ message: 'Usulan sudah selesai', id });
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
    const query = `
    SELECT * 
    FROM surat_tugas 
    ORDER BY tglst, id_st`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(rows);
    });
});




// --- ENDPOINT USER ---

// endpoint: usulan_pengetahuan
app.get('/pengetahuan', (req, res) => {
    const query = `
    SELECT * 
    FROM usulan_pengetahuan 
    WHERE status = 0 
    ORDER BY vote DESC`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(rows);
    });
});

// endpoint: usulan_pengetahuan tambah
app.post('/pengetahuan', (req, res) => {
    const { narasumber, materi, pengusul } = req.body;
    if (!narasumber || !materi) {
        return res.status(400).json({ message: 'Narasumber and Materi are required' });
    }
    const query = `
    INSERT INTO usulan_pengetahuan (pengusul,narasumber,pengetahuan)
	VALUES (?, ?, ?)
    `;
    db.run(query, [pengusul, narasumber, materi], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ id: this.lastID, pengusul, narasumber, pengetahuan: materi });
    });
    
});

// endpoint: usulan_pengetahuan catat voter
app.post('/pengetahuan/vote', (req, res) => {
    const { id, voter } = req.body;
    if (!id || !voter) {
        return res.status(400).json({ message: 'ID and voter are required' });
    }
    
    const query = `
    INSERT INTO user_vote (voter, id_pengetahuan)
    VALUES (?, ?)`;
    db.run(query, [voter, id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json({ id: this.lastID, voter, id_usulan: id });
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
    
    const query = `
        SELECT  
        AVG(rik_renc) AS perencanaan, 
        AVG(rik_laks) AS pelaksanaan, 
        AVG(rik_lap) AS pelaporan, 
        AVG(pelayanan) AS pelayanan, 
        AVG(akuntabel) AS akuntabel, 
        AVG(kompeten) AS kompeten, 
        AVG(harmoni) AS harmonis, 
        AVG(loyal) AS loyalitas, 
        AVG(adaptif) AS adaptif, 
        AVG(kolaboratif) AS kolaboratif
        FROM penilaian
        WHERE dinilai = ?
        GROUP BY dinilai
    ` 
    db.all(query, [nama], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(row);
    });
});


// endpoint: mengambil tugas penilaian berdasarkan id_penilai
app.get('/api/tugas/:id_penilai', (req, res) => {
    const id_penilai = req.params.id_penilai;

    const query = `
        SELECT BB.id_st, 
        BB.no_st, 
        BB.perihalst, 
        BB.entabr, 
        AA.jumlah_dinilai, 
        AA.sudah_dinilai
        FROM (SELECT 
                id_tugas, 
                count(*) jumlah_dinilai, 
                sum(status) sudah_dinilai
            FROM penilaian
            WHERE id_penilai = ?
            group by id_tugas) AS AA 
        LEFT JOIN surat_tugas AS BB 
        ON AA.id_tugas = BB.no_st
        ORDER BY BB.id_st
    `
    db.all(query, [id_penilai], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!rows || rows.length === 0) {
            return res.status(200).json([]);
        }
        res.status(200).json(rows);
    });
});

// endpoint: penilaian mengambil siapa saja yang harus dinilai
app.get('/api/tugas/menilai/:id_penilai/:id_tugas', (req, res) => {
    const { id_penilai, id_tugas } = req.params;
    if (!id_penilai || !id_tugas) {
        return res.status(400).json({ message: 'id_penilai and id_tugas are required' });
    }

    // Query to get the users who need to be evaluated
    const query = `
        SELECT st.id_st, 
        st.entabr, 
        p.id_penilai,
        p.penilai,
        p.id_dinilai,
        p.dinilai,
        u.fotolink
        FROM penilaian p
        LEFT JOIN surat_tugas st ON p.id_tugas = st.no_st 
        LEFT JOIN users u ON p.id_dinilai = u.id
        WHERE p.id_penilai = ?
        AND st.id_st = ?
    `;
    db.all(query, [id_penilai, id_tugas], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.status(200).json(rows);
    });
});


// ---ENDPOINT STRUKTURAL---

// endpoint: nilai dari grup yang sama
app.get('/api/staf/:grup', (req, res) => {
    const grup = req.params.grup;
    const query = `
        SELECT BB.id, BB.nama,
        AA.perencanaan,
        AA.pelaksanaan,
        AA.pelaporan,
        AA.pelayanan,
        AA.akuntabel,
        AA.kompeten,
        AA.harmoni,
        AA.loyal,
        AA.adaptif,
        AA.kolaboratif 
        FROM (SELECT id_dinilai, dinilai,
        AVG(rik_renc) AS perencanaan, 
        AVG(rik_laks) AS pelaksanaan, 
        AVG(rik_lap) AS pelaporan, 
        AVG(pelayanan) AS pelayanan, 
        AVG(akuntabel) AS akuntabel, 
        AVG(kompeten) AS kompeten, 
        AVG(harmoni) AS harmoni, 
        AVG(loyal) AS loyal, 
        AVG(adaptif) AS adaptif, 
        AVG(kolaboratif) AS kolaboratif
        FROM penilaian
        GROUP BY id_dinilai, dinilai) AS AA
        INNER JOIN (SELECT id, nama
        FROM users
        WHERE grup = ?) AS BB ON AA.id_dinilai = BB.id
        ORDER BY BB.id 
    `;
    db.all(query, [grup], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            pesan: "Berhasil Mengambil data Nilai",
            hasil: row
        });
    });
});


// --- ALAT BANTU ---

// endpoint: mengambil data pegawai 
app.get('/api/pegawai', (_, res) => {
    const query = `
    select nama
    FROM data_pegawai
    WHERE aktifpeg = 'Aktif'
    ORDER BY id`;
    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(rows);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
