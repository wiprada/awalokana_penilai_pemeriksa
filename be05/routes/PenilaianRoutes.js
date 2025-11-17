const express = require("express");
const penilaianController = require("../controllers/PenilaianController");

const router = express.Router();

// Route to get All penilaian data
router.get("/", penilaianController.getAllPenilaian);

// Route to get penilaian by id_dinilai
router.get("/:id_dinilai", penilaianController.getPenilaianById);

module.exports = router;
