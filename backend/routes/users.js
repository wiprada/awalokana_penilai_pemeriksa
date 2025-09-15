const express = require('express');

const router = express.Router();

// controller functions
const usersController = {
    register: (_req, res) => {
        // Register new user
        res.json({ message: 'User registered' });
    },
    login: (_req, res) => {
        // Authenticate user
        res.json({ message: 'User logged in' });
    },
    updateStatus: (_req, res) => {
        // Update user status
        res.json({ message: 'User status updated' });
    },
    updateInfo: (_req, res) => {
        // Update user information
        res.json({ message: 'User information updated' });
    }
};

// Register user
router.post('/register', usersController.register);

// User login
router.post('/login', usersController.login);

// Update user status
router.patch('/:id/status', usersController.updateStatus);

// Update user information
router.put('/:id', usersController.updateInfo);

module.exports = router;