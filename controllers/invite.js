const { Invite } = require('../models/invite');

const getAll = async () => {
  return Invite.find({}).exec();
};

const add = async inviteData => {
  return Invite.create(inviteData);
};

module.exports = { getAll, add };