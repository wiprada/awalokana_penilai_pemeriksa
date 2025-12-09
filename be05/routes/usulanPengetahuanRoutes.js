const express = require("express");
const usulanPengetahuanController = require("../controllers/usulanPengetahuanController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// GET all usulan pengetahuan
router.get("/", usulanPengetahuanController.getAllUsulanPengetahuan);

// GET all active usulan pengetahuan
router.get("/active", usulanPengetahuanController.getActiveUsulanPengetahuan);

// GET all done usulan pengetahuan
router.get("/done", usulanPengetahuanController.getDoneUsulanPengetahuan);

// GET a single usulan pengetahuan by ID
router.get(
  "/:id",
  verifyToken,
  usulanPengetahuanController.getUsulanPengetahuanById,
);

// POST a new usulan pengetahuan
router.post(
  "/",
  verifyToken,
  usulanPengetahuanController.createUsulanPengetahuan,
);

// UPDATE STATUS usulan pengetahuan by ID
router.patch(
  "/:id",
  verifyToken,
  usulanPengetahuanController.setDoneUsulanPengetahuan,
);

// DELETE an usulan pengetahuan by ID
router.delete(
  "/:id",
  verifyToken,
  usulanPengetahuanController.deleteUsulanPengetahuan,
);

module.exports = router;
