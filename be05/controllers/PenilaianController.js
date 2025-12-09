const penilaian = require("../models/Penilaian.js");

// Get all penilaian
const getAllPenilaian = async (req, res) => {
  try {
    const result = await penilaian.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get penilaian by id_dinilai
const getPenilaianById = async (req, res) => {
  try {
    const id_dinilai = req.params.id_dinilai;

    const result = await penilaian.getbyid(id_dinilai);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Penilaian by id_penilai
const getPenilaianByIdPenilai = async (req, res) => {
  try {
    const result = await penilaian.getByIdPenilai(req.params.id_penilai);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get penugasan by id_penilai
const getPenugasanByIdPenilai = async (req, res) => {
  try {
    const result = await penilaian.getPenugasanByIdPenilai(
      req.params.id_penilai,
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllPenilaian,
  getPenilaianById,
  getPenilaianByIdPenilai,
  getPenugasanByIdPenilai,
};
