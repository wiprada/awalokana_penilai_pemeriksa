const express = require("express");
const usulanPengetahuanController = require("../controllers/usulanPengetahuanController");

const router = express.Router();

// GET all usulan pengetahuan
router.get("/", usulanPengetahuanController.getAllUsulanPengetahuan);

// GET all active usulan pengetahuan
router.get("/active", usulanPengetahuanController.getActiveUsulanPengetahuan);

// GET all done usulan pengetahuan
router.get("/done", usulanPengetahuanController.getDoneUsulanPengetahuan);

// GET a single usulan pengetahuan by ID
router.get("/:id", usulanPengetahuanController.getUsulanPengetahuanById);

// POST a new usulan pengetahuan
router.post("/", usulanPengetahuanController.createUsulanPengetahuan);

// UPDATE an usulan pengetahuan by ID
// router.patch("/:id", usulanPengetahuanController.updateUsulanPengetahuan);

// UPDATE STATUS usulan pengetahuan by ID
router.patch("/:id", usulanPengetahuanController.setDoneUsulanPengetahuan);

// DELETE an usulan pengetahuan by ID
router.delete("/:id", usulanPengetahuanController.deleteUsulanPengetahuan);

module.exports = router;
