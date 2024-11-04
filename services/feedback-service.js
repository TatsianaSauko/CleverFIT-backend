const { StatusCodes } = require('http-status-codes');
const Feedback = require('../models/feedback');

class FeedbackService {
    async feedbackActionService(message, rating, userId) {
        if (!rating) {
            return {
                statusCode: StatusCodes.CONFLICT,
                error: 'Conflict',
                message: 'Для создания отзыва рейтинг обязателен'
            };
        }

        try {
            const feedback = new Feedback({ message, rating, user: userId });
            await feedback.save();

            const populatedFeedback = await Feedback.findById(feedback._id).populate('user', 'firstName lastName imgSrc');
            const fullName = populatedFeedback.user.firstName && populatedFeedback.user.lastName
                ? `${populatedFeedback.user.firstName} ${populatedFeedback.user.lastName}`
                : null;
                const imageSrc = populatedFeedback.user.imgSrc || null;

            return {
                statusCode: StatusCodes.CREATED,
                data: {
                    id: populatedFeedback._id,
                    fullName: fullName,
                    imageSrc: imageSrc,
                    message: populatedFeedback.message,
                    rating: populatedFeedback.rating,
                    createdAt: populatedFeedback.createdAt
                }
            };
        } catch (error) {
            console.error('Ошибка создания отзыва:', error);

            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }

    async getFeedbackService() {
        try {
            const feedbacks = await Feedback.find();
            return {
                statusCode: StatusCodes.OK,
                data: feedbacks
            }
        } catch (error) {
            console.error('Ошибка получения отзывов:', error);
            return {
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }
}

exports.module = new FeedbackService();