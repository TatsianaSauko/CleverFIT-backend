const { getTrainingList, getTariffList } = require('../controllers/catalogController');

const service = {
    getTrainingList: (req, res) => getTrainingList(req, res),
    getTariffList: (req, res) => getTariffList(req, res),
};

module.exports = service;
