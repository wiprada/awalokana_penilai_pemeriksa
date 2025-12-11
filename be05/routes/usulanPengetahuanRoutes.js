const express = require("express");
const usulanPengetahuanController = require("../controllers/usulanPengetahuanController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// GET all usulan pengetahuan
router.get("/", usulanPengetahuanController.getAllUsulanPengetahuan);

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

module.exports = router;
