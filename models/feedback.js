const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);

