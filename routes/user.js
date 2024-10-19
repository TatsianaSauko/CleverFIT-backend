const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authenticateToken');
const dotenv = require('dotenv');

// Загрузка переменных окружения из .env файла
dotenv.config();

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

// Маршрут для обновления данных пользователя
router.put('/', authenticateToken, async (req, res) => {
    const { email, password, firstName, lastName, birthday, imgSrc, readyForJointTraining } = req.body;

    try {
        const updateData = {
            email,
            firstName,
            lastName,
            birthday,
            imgSrc,
            readyForJointTraining,
        };

        // Обновление пароля, если он передан
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Пользователь не найден'
            });
        }

        res.status(200).json({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthday,
            imgSrc: user.imgSrc,
            readyForJointTraining: user.readyForJointTraining,
        });
    } catch (error) {
        console.error('Ошибка обновления данных пользователя:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});

module.exports = router;
