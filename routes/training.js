const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

const TrainingController = require("../controllers/training-controller");

// GET /training - Получение всех персональных тренировок
router.get('/', authenticateToken, TrainingController.getTrainingData);

router.post('/', authenticateToken, TrainingController.sendTrainingData);

module.exports = router;
