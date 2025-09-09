const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const assignmentRoutes = require('./routes/assignments');
const proposalRoutes = require('./routes/proposals');
const cors = require('cors');

const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./database.db');

// const app = express();
// const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/mywebapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/proposals', proposalRoutes);

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(401).json({ error: 'User not found' });
    bcrypt.compare(password, user.password_hash, (err, result) => {
      if (result) {
        res.json({ id: user.id, role: user.role, email: user.email });
      } else {
        res.status(401).json({ error: 'Wrong password' });
      }
    });
  });
});

// Endpoint ganti password
app.post('/api/change-password', (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    bcrypt.compare(oldPassword, user.password_hash, (err, result) => {
      if (!result) return res.status(401).json({ error: 'Wrong old password' });
      bcrypt.hash(newPassword, 10, (err, hash) => {
        db.run('UPDATE users SET password_hash = ? WHERE email = ?', [hash, email], (err) => {
          if (err) return res.status(500).json({ error: 'Update failed' });
          res.json({ message: 'Password updated successfully' });
        });
      });
    });
  });
});


// ...tambahkan endpoint lain sesuai kebutuhan (assignment, proposal, dsb)

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));

// Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });