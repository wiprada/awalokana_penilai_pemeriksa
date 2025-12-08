const UserVote = require("../models/userVote");

// Create a new vote
const createVote = async (req, res) => {
  try {
    // In a real app, you would get the user ID from an authentication middleware
    // For example: const userId = req.user.id;
    const result = await UserVote.save(req.body);
    res.status(201).json({
      message: "Vote recorded successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// check if a user has already voted for a specific knowledge proposal
const hasVoted = async (req, res) => {
  try {
    const { id_user, id_pengetahuan } = req.body;
    const exists = await UserVote.checkExistingVote(id_user, id_pengetahuan);
    res.status(200).json({ hasVoted: exists });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createVote,
  hasVoted,
};