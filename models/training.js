const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    replays: { type: Number, required: true },
    weight: { type: Number, required: true },
    approaches: { type: Number, required: true },
    isImplementation: { type: Boolean, default: false },
});

const TrainingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    isImplementation: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    parameters: {
        repeat: { type: Boolean, default: false },
        period: { type: Number, default: 7 },
        jointTraining: { type: Boolean, default: false },
        participants: [{ type: String }],
    },
    exercises: [ExerciseSchema],
});

module.exports = mongoose.model('Training', TrainingSchema);
