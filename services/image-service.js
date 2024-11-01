const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');

class ImageService {
    async uploadImageService(userID, imgUrl, filename) {
        try {
            // Обновляем пользователя, чтобы сохранить путь к изображению
            const user = await User.findByIdAndUpdate(userID, { imgSrc: imgUrl }, { new: true });
            if (!user) {
                return {
                    statusCode: 404,
                    error: 'Not Found',
                    message: 'Пользователь не найден'
                };
            }
    
            return {
                statusCode: 200,
                name: filename,
                url: imgUrl,
            };
        } catch (error) {
            console.error('Ошибка обновления изображения:', error);

            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }
}

exports.module = new ImageService(); 