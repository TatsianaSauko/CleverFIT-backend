const dotenv = require('dotenv');
dotenv.config();
const crypto = require('crypto');

const User = require('../models/user');

const tempCodes = {};

class EmailService {
    async checkEmailService(email) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return {
                    statusCode: 404,
                    error: 'Not Found',
                    message: 'Пользователь с таким email не найден'
                };
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
                    return {
                        statusCode: 500,
                        error: 'Internal Server Error',
                        message: 'Ошибка отправки email'
                    };
                } else {
                    return {
                        statusCode: 200,
                        message: 'Код отправлен на email',
                        email: email,
                    };
                }
            });
        } catch (error) {
            console.error('Ошибка проверки email:', error);
            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }

    async confirmEmailService(email, code) {
        try {
            const storedCode = tempCodes[email];
            if (!storedCode || storedCode !== code) {
                return {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'Неверный код'
                };
            }
    
            // Email подтвержден, можно удалить временный код
            delete tempCodes[email];
    
            // res.cookie('emailVerified', true, { httpOnly: true, secure: true, sameSite: 'None' });
            // res.cookie('userEmail', email, { httpOnly: true, secure: true, sameSite: 'None' });

            return {
                statusCode: 200,
                message: "Email подтвержден",
                email: email
            }
        } catch (error) {
            console.error('Ошибка подтверждения email:', error);

            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }
}

exports.module = new EmailService(); 