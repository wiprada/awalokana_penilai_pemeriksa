const UsulanPengetahuan = require("../models/usulanPengetahuan");

// Get all usulan pengetahuan
const getAllUsulanPengetahuan = async (req, res) => {
  try {
    const result = await UsulanPengetahuan.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all active usulan pengetahuan
const getActiveUsulanPengetahuan = async (_req, res) => {
  try {
    const usulanPengetahuanList = await UsulanPengetahuan.getActive();
    res.status(200).json(usulanPengetahuanList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all done usulan pengetahuan
const getDoneUsulanPengetahuan = async (_req, res) => {
  try {
    const usulanPengetahuanList = await UsulanPengetahuan.getDone();
    res.status(200).json(usulanPengetahuanList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single usulan pengetahuan by ID
const getUsulanPengetahuanById = async (req, res) => {
  try {
    const usulan = await UsulanPengetahuan.findById(req.params.id);
    if (!usulan) {
      return res.status(404).json({ message: "Usulan Pengetahuan not found" });
    }
    res.status(200).json(usulan);
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
  const usulan = new UsulanPengetahuan({
    ...req.body,
  });

  try {
    const newUsulan = await usulan.save();
    res.status(201).json(newUsulan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing usulan pengetahuan
const updateUsulanPengetahuan = async (req, res) => {
  try {
    const updatedUsulan = await UsulanPengetahuan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedUsulan) {
      return res.status(404).json({ message: "Usulan Pengetahuan not found" });
    }
    res.status(200).json(updatedUsulan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an usulan pengetahuan
const deleteUsulanPengetahuan = async (req, res) => {
  try {
    const usulan = await UsulanPengetahuan.findByIdAndDelete(req.params.id);
    if (!usulan) {
      return res.status(404).json({ message: "Usulan Pengetahuan not found" });
    }
    res
      .status(200)
      .json({ message: "Usulan Pengetahuan deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsulanPengetahuan,
  getActiveUsulanPengetahuan,
  getDoneUsulanPengetahuan,
  getUsulanPengetahuanById,
  setDoneUsulanPengetahuan,
  createUsulanPengetahuan,
  updateUsulanPengetahuan,
  deleteUsulanPengetahuan,
};
