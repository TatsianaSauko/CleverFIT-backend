// const feedbackService = require("../services/feedback-service");
const imageService = require("../services/image-service");

class ImageController {
    async uploadImage(request, response, next) {
        if (!request.file) {
            return response
                .status(400)
                .json({
                    statusCode: 400,
                    error: 'Bad Request',
                    message: 'Файл не был загружен'
                });
        }

        const imgUrl = `${request.protocol}://${request.get('host')}/uploads/${request.file.filename}`;

        const uploadImageStatus = imageService.module.uploadImageService(request.user.id, imgUrl, request.file.filename);

        if(uploadImageStatus.statusCode === 200) {
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