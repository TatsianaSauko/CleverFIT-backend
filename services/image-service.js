const { StatusCodes } = require('http-status-codes');

const User = require('../models/user');

class ImageService {
    async uploadImageService(userID, imgUrl, filename) {
        try {
            // Обновляем пользователя, чтобы сохранить путь к изображению
            const user = await User.findByIdAndUpdate(userID, { imgSrc: imgUrl }, { new: true });
            if (!user) {
                return {
                    statusCode: StatusCodes.NOT_FOUND,
                    error: 'Not Found',
                    message: 'Пользователь не найден'
                };
            }

            return {
                statusCode: StatusCodes.OK,
                name: filename,
                url: imgUrl,
            };
        } catch (error) {
            console.error('Ошибка обновления изображения:', error);

            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }
}

exports.module = new ImageService();