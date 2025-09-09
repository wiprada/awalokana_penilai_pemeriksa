// filepath: my-web-app/my-web-app/backend/src/controllers/authController.js
const User = require('../models/user');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const role = user.role;
        const token = user.generateAuthToken();

        res.status(200).json({ token, role });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.verifyRole = (req, res, next) => {
    const role = req.user.role;

    if (role === 'pemeriksa' || role === 'atasan') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};