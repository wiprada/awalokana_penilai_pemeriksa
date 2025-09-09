// filepath: my-web-app/my-web-app/backend/src/controllers/proposalController.js
const Proposal = require('../models/proposal');

// Fetch all proposals submitted by examiners
exports.getProposals = async (req, res) => {
    try {
        const proposals = await Proposal.find();
        res.status(200).json(proposals);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching proposals', error });
    }
};

// Create a new proposal
exports.createProposal = async (req, res) => {
    const { title, description, examinerId } = req.body;

    const newProposal = new Proposal({
        title,
        description,
        examinerId,
        createdAt: new Date(),
    });

    try {
        const savedProposal = await newProposal.save();
        res.status(201).json(savedProposal);
    } catch (error) {
        res.status(500).json({ message: 'Error creating proposal', error });
    }
};