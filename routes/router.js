const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth-controller');
const CatalogController = require('../controllers/catalog-controller');
const EmailController = require('../controllers/email-controller');
const FeedbackController = require('../controllers/feedback-controller');
const TrainingController = require('../controllers/training-controller');
const ImageController = require('../controllers/image-controller');
const UserController = require('../controllers/user-controller');
const InviteController = require('../controllers/invite-controller');

const authenticateToken = require('../middleware/authenticateToken');
const limiter = require('../helpers/catalogLimiter');
const upload = require('../helpers/image');

const catchErrors = require('../middleware/catchErrors');

router.post('/registration', AuthController.registration); // Маршрут для регистрации
router.post('/login', AuthController.login); // Маршрут для авторизации

router.get('/training-list', authenticateToken, limiter, CatalogController.getTrainingList); // GET /catalogs/training-list - Получение списка тренировок


router.post('/check-email', EmailController.checkEmail); // Маршрут для проверки email и отправки временного кода
router.post('/confirm-email', EmailController.confirmEmail); // Маршрут для подтверждения email и проверки временного кода

router.post('/', authenticateToken, FeedbackController.feedbackAction);
router.get('/', authenticateToken, FeedbackController.getFeedback);

router.get('/training', authenticateToken, TrainingController.getTrainingData); // GET /training - Получение всех персональных тренировок
router.post('/training', authenticateToken, TrainingController.sendTrainingData);
router.put('/training', authenticateToken, TrainingController.editTrainingData);

router.post('/', authenticateToken, upload.single('file'), ImageController.uploadImage); // Маршрут для загрузки изображения

router.get('/me', authenticateToken, UserController.getUserData);
router.post('/change-password', UserController.changePassword); // Маршрут для изменения пароля
router.put('/', authenticateToken, UserController.updateUserData); // Маршрут для обновления данных пользователя

router.get('/invite', authenticateToken, limiter, catchErrors(InviteController.getAllInvites));
router.post('/invite', authenticateToken, limiter, catchErrors(InviteController.createInvite)); 

module.exports = router;