const express = require("express");
const cors = require("cors");
// const connection = require('./koneksi.js');
const indexRoutes = require("./routes/indexRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const usulanPengetahuanRoutes = require("./routes/usulanPengetahuanRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Use the routers
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/usulan-pengetahuan", usulanPengetahuanRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
