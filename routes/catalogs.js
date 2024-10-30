const express = require('express');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

const CatalogController = require("../controllers/catalog-controller");
const limiter = require("../helpers/catalog");

// GET /catalogs/training-list - Получение списка тренировок
router.get('/training-list', authenticateToken, limiter, CatalogController.getTrainingList);

module.exports = router;
