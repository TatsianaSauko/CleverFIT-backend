const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const authenticateToken = require('../middleware/authenticateToken');

router.post('/', authenticateToken, async (req, res) => {
    const { message, rating } = req.body;
    const userId = req.user.id; // Assuming the user ID is available in the token

    if (!rating) {
        return res.status(409).json({
            statusCode: 409,
            error: 'Conflict',
            message: 'Для создания отзыва рейтинг обязателен'
        });
    }

    try {
        const feedback = new Feedback({ message, rating, user: userId });
        await feedback.save();

        const populatedFeedback = await Feedback.findById(feedback._id).populate('user', 'firstName lastName imgSrc');
		const fullName = populatedFeedback.user.firstName && populatedFeedback.user.lastName
            ? `${populatedFeedback.user.firstName} ${populatedFeedback.user.lastName}`
            : null;
			const imageSrc = populatedFeedback.user.imgSrc || null;	

        res.status(201).json({
            id: populatedFeedback._id,
            fullName: fullName,
            imageSrc: imageSrc,
            message: populatedFeedback.message,
            rating: populatedFeedback.rating,
            createdAt: populatedFeedback.createdAt
        });
    } catch (error) {
        console.error('Ошибка создания отзыва:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});


router.get('/', authenticateToken, async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Ошибка получения отзывов:', error);
        res.status(500).json({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Ошибка сервера'
        });
    }
});

module.exports = router;
