const UsulanPengetahuan = require("../models/usulanPengetahuan");

// Get all usulan pengetahuan
const getAllUsulanPengetahuan = async (_req, res) => {
  try {
    const result = await UsulanPengetahuan.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Set an usulan pengetahuan to done by ID
const setDoneUsulanPengetahuan = async (req, res) => {
  try {
    const usulan = await UsulanPengetahuan.setDone(req.params.id);
    if (!usulan) {
      return res.status(404).json({ message: "Usulan Pengetahuan not found" });
    }
    res.status(200).json(usulan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new usulan pengetahuan
const createUsulanPengetahuan = async (req, res) => {
  try {
    const result = await UsulanPengetahuan.save(req.body);
    res.status(201).json({
      message: "Usulan Pengetahuan created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsulanPengetahuan,
  setDoneUsulanPengetahuan,
  createUsulanPengetahuan,
};
