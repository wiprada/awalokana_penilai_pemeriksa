const express = require("express");
const userVoteController = require("../controllers/userVoteController");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// POST a new vote
router.post("/", verifyToken, userVoteController.createVote);

// POST to check if a user has already voted for a specific knowledge proposal
router.post("/check", verifyToken, userVoteController.hasVoted);

module.exports = router;
