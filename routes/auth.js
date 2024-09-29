const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Маршрут для регистрации
router.post('/registration', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                statusCode: 409,
                error: 'Conflict',
                message: 'Пользователь уже существует'
            });
        }

        user = new User({ email, password });
        await user.save();

        res.status(201).json({
            message: 'Успешная регистрация'
        });
    } catch (error) {
        console.error('Ошибка регистрации:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});

// Маршрут для авторизации
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Bad Request',
                message: 'Неверный email или пароль'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Bad Request',
                message: 'Неверный email или пароль'
            });
        }

        const accessToken = jwt.sign({ id: user._id }, 'your-secret-key', { expiresIn: '1h' });

        res.status(200).json({
            accessToken
        });
    } catch (error) {
        console.error('Ошибка авторизации:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});

// Маршрут для изменения пароля
router.post('/change-password', async (req, res) => {
    const { password, confirmPassword } = req.body;
    const emailVerified = req.cookies.emailVerified;
    const userEmail = req.cookies.userEmail;

    if (!emailVerified) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Email не подтвержден'
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            statusCode: 400,
            error: 'Bad Request',
            message: 'Пароли не совпадают'
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOneAndUpdate(
            { email: userEmail },
            { password: hashedPassword },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Пользователь не найден'
            });
        }

        res.status(201).json({
            message: 'Пароль успешно изменен'
        });
    } catch (error) {
        console.error('Ошибка изменения пароля:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});

module.exports = router;
