const express = require("express");
const cors = require("cors");
const path = require("path");
const indexRoutes = require("./routes/indexRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const usulanPengetahuanRoutes = require("./routes/usulanPengetahuanRoutes");
const PenilaianRoutes = require("./routes/PenilaianRoutes");
const userVoteRoutes = require("./routes/userVoteRoutes"); // Import the new route

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors({ origin: "*" }));

// Serve static files from the Vue app
// app.use(express.static(path.join(__dirname, "../../fe05/dist")));

// Use the routers
app.use("/", indexRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/usulan-pengetahuan", usulanPengetahuanRoutes);
app.use("/penilaian", PenilaianRoutes);
app.use("/user-vote", userVoteRoutes); // Register the new route

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    // res.sendFile(path.join(__dirname, '../../fe05/dist/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
