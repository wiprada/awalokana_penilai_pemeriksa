const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const authMiddleware = require('../middleware/auth');

// Route to fetch ungraded assignments for examiners
router.get('/ungraded', authMiddleware.verifyRole('pemeriksa'), assignmentController.getUngradedAssignments);

// Route to fetch all assignments (for supervisors)
router.get('/', authMiddleware.verifyRole('atasan'), assignmentController.getAllAssignments);

module.exports = router;