const express = require("express");
const userVoteController = require("../controllers/userVoteController");

const router = express.Router();

// POST a new vote
router.post("/", userVoteController.createVote);

// POST to check if a user has already voted for a specific knowledge proposal
router.post("/check", userVoteController.hasVoted);

module.exports = router;