const express = require('express');
const router = express.Router();
const proposalController = require('../controllers/proposalController');
const authMiddleware = require('../middleware/auth');

// Route to fetch knowledge-sharing proposals submitted by examiners
router.get('/', authMiddleware.verifyRole(['pemeriksa', 'atasan']), proposalController.getProposals);

// Route to create a new knowledge-sharing proposal
router.post('/', authMiddleware.verifyRole(['pemeriksa']), proposalController.createProposal);

// Route to fetch proposals for a specific examiner (for supervisors)
router.get('/examiner/:examinerId', authMiddleware.verifyRole(['atasan']), proposalController.getProposalsByExaminer);

module.exports = router;