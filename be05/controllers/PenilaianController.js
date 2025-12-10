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

// Get nilai by id_dinilai
const getNilaiByIdDinilai = async (req, res) => {
  try {
    const id_dinilai = req.params.id_dinilai;

    const result = await penilaian.getByIdDinilai(id_dinilai);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Kualitatif by id_dinilai
const getKualitatifByIdDinilai = async (req, res) => {
  try {
    const id_dinilai = req.params.id_dinilai;

    const result = await penilaian.getKualitatifByIdDinilai(id_dinilai);
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

// update penilaian
const updatePenilaian = async (req, res) => {
  try {
    const penilaianData = req.body;

    const result = await penilaian.save(penilaianData);
    res.status(200).json({ message: "Penilaian updated successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Nilai Kelompok by Grup
const getNilaiKelompokByGrup = async (req, res) => {
  try {
    const grup = req.params.grup;

    const result = await penilaian.getNilaiKelompokByGrup(grup);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Progress Penilaian
const getProgressPenilaianAll = async (req, res) => {
  try {
    const result = await penilaian.getProgressPenilaianAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Penilaian oleh Admin (Jika diperlukan) per id_penilai
const resetPenilaianByIdPenilai = async (req, res) => {
  try {
    const id_penilai = req.params.id_penilai;

    const result = await penilaian.resetPenilaianByIdPenilai(id_penilai);
    res
      .status(200)
      .json({ message: "Penilaian reset successfully", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getAllPenilaian,
  getNilaiByIdDinilai,
  getPenilaianByIdPenilai,
  getPenugasanByIdPenilai,
  updatePenilaian,
  getKualitatifByIdDinilai,
  getNilaiKelompokByGrup,
  getProgressPenilaianAll,
  resetPenilaianByIdPenilai,
};
