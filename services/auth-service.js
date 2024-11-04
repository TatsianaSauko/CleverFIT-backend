const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user');

class AuthService {
    async registrationService(email, password) {
        try {
            let user = await User.findOne({ email });
            if (user) {
                return {
                    statusCode: StatusCodes.CONFLICT,
                    error: 'Conflict',
                    message: 'Пользователь уже существует'
                };
            }

            user = new User({ email, password });
            await user.save();

            return {
                statusCode: StatusCodes.CREATED,
                message: 'Успешная регистрация'
            };
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            }
        }
    }

    async loginService(email, password) {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'Неверный email или пароль'
                };
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return {
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'Неверный email или пароль'
                };
            }

            const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            return {
                statusCode: 200,
                accessToken: accessToken
            };
        } catch (error) {
            console.error('Ошибка авторизации:', error);

            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }
}

exports.module = new AuthService();