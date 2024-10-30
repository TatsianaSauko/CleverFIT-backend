const inviteRepo = require('../controllers/invite');

const getAll = () => inviteRepo.getAll();

const add = inviteData => inviteRepo.add(inviteData);

module.exports = { getAll, add };