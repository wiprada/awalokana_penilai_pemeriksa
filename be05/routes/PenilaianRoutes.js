const express = require("express");
const penilaianController = require("../controllers/PenilaianController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get All penilaian data
router.get("/", verifyToken, penilaianController.getAllPenilaian);

// Route to get penilaian by id_dinilai
router.get("/:id_dinilai", verifyToken, penilaianController.getPenilaianById);

// Route to get penilaian by id_penilai
router.get(
  "/penilai/:id_penilai",
  verifyToken,
  penilaianController.getPenilaianByIdPenilai,
);

// Route to get penugasan by id_penilai
router.get(
  "/penugasan/:id_penilai",
  verifyToken,
  penilaianController.getPenugasanByIdPenilai,
);

module.exports = router;
