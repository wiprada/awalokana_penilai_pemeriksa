const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const db = new sqlite3.Database('./database.db');

app.use(bodyParser.json());

// using cors for cross-origin requests
const cors = require('cors');
app.use(cors());

// --- Helper: Query wrapper ---
function dbGet(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => (err ? reject(err) : resolve(row)));
  });
}
function dbAll(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}
function dbRun(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

// --- Endpoint: Login ---
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    const user = await dbGet('SELECT * FROM users WHERE username = ?', [email]);
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials User' });
    }
    console.log('User found:', user);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials Password' });
    res.json({ message: 'Login successful', hasil: user });
    // add forking logic based on role if admin to admin dashoard if struktural to struktural dashoboard based on user.grup else dashboard
    if (user.role === 'admin') {
      // Redirect to admin dashboard
      res.json({ message: 'Redirecting to admin dashboard', hasil: user, redirect: '/admin' });
    } else if (user.role === 'struktur') {
      // Redirect to struktural dashboard
      res.json({ message: 'Redirecting to struktural dashboard', hasil: user, redirect: `/struktural/${user.grup}` });
    } else {
      // Redirect to general dashboard
      res.json({ message: 'Redirecting to general dashboard', hasil: user, redirect: `/dashboard/${user.id}` });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Endpoint: Reset User Password ---
app.post('/reset-password', async (req, res) => {
  const { userId, newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await dbRun('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, userId]);
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Endpoint: admin dashboard ---

// --- Endpoint: Get all knowledge management info ---
app.get('/knowledge', async (req, res) => {
  try {
    const rows = await dbAll('SELECT * FROM usulan_pengetahuan');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Endpoint: Add knowledge management info ---
app.post('/knowledge', async (req, res) => {
  const { title, content, status } = req.body;
  try {
    const result = await dbRun(
      'INSERT INTO usulan_pengetahuan (title, content, status) VALUES (?, ?, ?)',
      [title, content, status]
    );
    res.json({ message: 'Added', id: result.lastID });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Endpoint: Update status of knowledge management info ---
app.put('/knowledge/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const parsedId = parseInt(id, 10);
  if (isNaN(parsedId)) {
    return res.status(400).json({ error: 'Invalid ID parameter' });
  }
  try {
    await dbRun('UPDATE usulan_pengetahuan SET status = ? WHERE id = ?', [status, parsedId]);
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Start server ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});