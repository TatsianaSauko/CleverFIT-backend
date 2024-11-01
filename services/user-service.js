const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');

class FeedbackService {
    async getUserDataService(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            return {
                statusCode: 200,
                data: user
            }
        } catch (error) {
            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }

    async changePasswordService(password, userEmail) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.findOneAndUpdate(
                { email: userEmail },
                { password: hashedPassword },
                { new: true }
            );
            if (!user) {
                return {
                    statusCode: 404,
                    error: 'Not Found',
                    message: 'Пользователь не найден'
                };
            }
    
            return {
                statusCode: 201, 
                message: 'Пароль успешно изменен'
            };
        } catch (error) {
            console.error('Ошибка изменения пароля:', error);

            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }

    async updateUserDataService(updateData, password, userID) {
        try {
            // Обновление пароля, если он передан
            if (password) {
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(password, salt);
            }
    
            const user = await User.findByIdAndUpdate(userID, updateData, { new: true });
            if (!user) {
                return {
                    statusCode: 404,
                    error: 'Not Found',
                    message: 'Пользователь не найден'
                };
            }
    
            return {
                statusCode: 200,
                data: {
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    birthday: user.birthday,
                    imgSrc: user.imgSrc,
                    readyForJointTraining: user.readyForJointTraining,
                    sendNotification: user.sendNotification,
                }
            }
        } catch (error) {
            console.error('Ошибка обновления данных пользователя:', error);

            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }
}

exports.module = new FeedbackService(); 