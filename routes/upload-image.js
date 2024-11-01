const express = require('express');
const router = express.Router();

const authenticateToken = require('../middleware/authenticateToken');
const ImageController = require("../controllers/image-controller");

const upload = require("../helpers/image");

// Маршрут для загрузки изображения
router.post('/', authenticateToken, upload.single('file'), ImageController.uploadImage);

module.exports = router;
