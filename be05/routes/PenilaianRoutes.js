const express = require("express");
const penilaianController = require("../controllers/PenilaianController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get All penilaian data
router.get("/", verifyToken, penilaianController.getAllPenilaian);

// Route to get penilaian by id_dinilai
router.get(
  "/dinilai/:id_dinilai",
  verifyToken,
  penilaianController.getNilaiByIdDinilai,
);

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

// Route to update penilaian
router.put("/update", verifyToken, penilaianController.updatePenilaian);

// Route to get kualitatif by id_dinilai
router.get(
  "/kualitatif/:id_dinilai",
  verifyToken,
  penilaianController.getKualitatifByIdDinilai,
);

// Route to get nilai kelompok
router.get(
  "/kelompok/:grup",
  verifyToken,
  penilaianController.getNilaiKelompokByGrup,
);

// Route to get All Progress Penilaian
router.get(
  "/admin/progress",
  verifyToken,
  penilaianController.getProgressPenilaianAll,
);

// Route to Reset Penilaian per id_penilai
router.put(
  "/admin/:id_penilai",
  verifyToken,
  penilaianController.resetPenilaianByIdPenilai,
);

module.exports = router;
