const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');

const User = require('../models/user');

class FeedbackService {
    async getUserDataService(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            return {
                statusCode: StatusCodes.OK,
                data: user
            }
        } catch (error) {
            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }

    async changePasswordService(password, userEmail) {
        try {
            const hashedPassword = await bcrypt.hash(password, +process.env.HASH_SALT);
            const user = await User.findOneAndUpdate(
                { email: userEmail },
                { password: hashedPassword },
                { new: true }
            );
            if (!user) {
                return {
                    statusCode: StatusCodes.NOT_FOUND,
                    error: 'Not Found',
                    message: 'Пользователь не найден'
                };
            }

            return {
                statusCode: StatusCodes.CREATED,
                message: 'Пароль успешно изменен'
            };
        } catch (error) {
            console.error('Ошибка изменения пароля:', error);

            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }

    async updateUserDataService(updateData, password, userID) {
        try {
            // Обновление пароля, если он передан
            if (password) {
                const salt = await bcrypt.genSalt(+process.env.HASH_SALT);
                updateData.password = await bcrypt.hash(password, salt);
            }

            const user = await User.findByIdAndUpdate(userID, updateData, { new: true });
            if (!user) {
                return {
                    statusCode: StatusCodes.NOT_FOUND,
                    error: 'Not Found',
                    message: 'Пользователь не найден'
                };
            }

            return {
                statusCode: StatusCodes.CREATED,
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
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }
}

exports.module = new FeedbackService();