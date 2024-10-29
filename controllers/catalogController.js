const { STATUS_CODES, ERRORS } = require('../common/constants');

const trainingList = [
    { name: 'Ноги', key: 'legs' },
    { name: 'Руки', key: 'hands' },
    { name: 'Силовая', key: 'strength' },
    { name: 'Спина', key: 'back' },
    { name: 'Грудь', key: 'chest' },
];

const tariffs = [
    {
        _id: "65df21ca9013cb64beacbd56",
        name: "Pro",
        periods: [
            { text: "6 месяцев", cost: 5.5, days: 182 },
            { text: "9 месяцев", cost: 8.5, days: 274 },
            { text: "12 месяцев", cost: 10, days: 365 }
        ]
    }
];

const getTrainingList = (req, res) => {
    try {
        res.status(STATUS_CODES.OK).json(trainingList);
    } catch (error) {
        console.error('Ошибка при получении списка тренировок:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
            message: ERRORS.SERVER_ERROR,
        });
    }
};

const getTariffList = (req, res) => {
    try {
        res.status(STATUS_CODES.OK).json(tariffs);
    } catch (error) {
        console.error('Ошибка при получении тарифных планов:', error);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            error: 'Server Error',
            message: ERRORS.SERVER_ERROR,
        });
    }
};

module.exports = { getTrainingList, getTariffList };
