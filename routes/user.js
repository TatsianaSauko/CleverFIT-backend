const express = require('express');
const router = express.Router();
const User = require('../models/user');
const authenticateToken = require('../middleware/authenticateToken');

router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});

module.exports = router;
