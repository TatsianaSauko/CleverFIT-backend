const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

class UserService {
    async registrationService(email, password) {
        try {
            let user = await User.findOne({ email });
            if (user) {
                return {
                    statusCode: 409,
                    error: 'Conflict',
                    message: 'Пользователь уже существует'
                };
            }
    
            user = new User({ email, password });
            await user.save();
    
            return {
                statusCode: 201,
                message: 'Успешная регистрация'
            };
        } catch (error) {
            console.error('Ошибка регистрации:', error);
            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            }
        }
    }

    async loginService() {
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

exports.module = new UserService(); 