const dotenv = require('dotenv');
dotenv.config();

const Feedback = require('../models/feedback');

class FeedbackService {
    async feedbackActionService(message, rating, userId) {
        if (!rating) {
            return {
                statusCode: 409,
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
                statusCode: 201,
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
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }

    async getFeedbackService() {
        try {
            const feedbacks = await Feedback.find();
            return {
                statusCode: 200,
                data: feedbacks
            }
        } catch (error) {
            console.error('Ошибка получения отзывов:', error);
            return {
                statusCode: 500,
                error: 'Internal Server Error',
                message: 'Ошибка сервера'
            };
        }
    }
}

exports.module = new FeedbackService(); 