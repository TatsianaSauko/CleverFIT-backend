const { StatusCodes } = require('http-status-codes');

const imageService = require('../services/image-service');

class ImageController {
    async uploadImage(request, response, next) {
        if (!request.file) {
            return response
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    statusCode: StatusCodes.BAD_REQUEST,
                    error: 'Bad Request',
                    message: 'Файл не был загружен'
                });
        }

        const imgUrl = `${request.protocol}://${request.get('host')}/uploads/${request.file.filename}`;

        const uploadImageStatus = imageService.module.uploadImageService(request.user.id, imgUrl, request.file.filename);

        if(uploadImageStatus.statusCode === StatusCodes.OK) {
            return response
                .status(uploadImageStatus.statusCode)
                .json({
                    name: uploadImageStatus.filename,
                    url: uploadImageStatus.imgUrl,
                });
        }

        response
            .status(uploadImageStatus.statusCode)
            .json(uploadImageStatus);
    }
}

module.exports = new ImageController();