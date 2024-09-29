const express = require('express');
const router = express.Router();
const User = require('../models/user');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Настройка почтового транспорта
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'tankacav@gmail.com',
        pass: 'nbma fjng nlfg jsof'
    }
});

const tempCodes = {};

// Маршрут для проверки email и отправки временного кода
router.post('/check-email', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                statusCode: 404,
                error: 'Not Found',
                message: 'Пользователь с таким email не найден'
            });
        }

        // Генерация временного кода
        const tempCode = crypto.randomBytes(3).toString('hex');
        tempCodes[email] = tempCode; // Store the code

        // Определение mailOptions
        const mailOptions = {
            from: 'tankacav@gmail.com',
            to: email,
            subject: 'Код для подтверждения email',
            text: `Ваш временный код: ${tempCode}`
        };

        // Отправка временного кода на email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Ошибка отправки email:', error);
                return res.status(500).json({
                    statusCode: 500,
                    error: 'Internal Server Error',
                    message: 'Ошибка отправки email'
                });
            } else {
                return res.status(200).json({
                    email,
                    message: 'Код отправлен на email'
                });
            }
        });
    } catch (error) {
        console.error('Ошибка проверки email:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});

// Маршрут для подтверждения email и проверки временного кода
router.post('/confirm-email', (req, res) => {
    const { email, code } = req.body;
    try {
        const storedCode = tempCodes[email];
        if (!storedCode || storedCode !== code) {
            return res.status(400).json({
                statusCode: 400,
                error: 'Bad Request',
                message: 'Неверный код'
            });
        }

        // Email подтвержден, можно удалить временный код
        delete tempCodes[email];

        // res.cookie('emailVerified', true, { httpOnly: true, secure: true, sameSite: 'None' });
        // res.cookie('userEmail', email, { httpOnly: true, secure: true, sameSite: 'None' });

        res.cookie('emailVerified', true, { httpOnly: true });
        res.cookie('userEmail', email, { httpOnly: true });

        return res.status(200).json({
            email,
            message: 'Email подтвержден'
        });
    } catch (error) {
        console.error('Ошибка подтверждения email:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});

module.exports = router;