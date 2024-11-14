const ERRORS = {
  BAD_REQUEST: 'Ошибка в запросе',
  SERVER_ERROR: 'Ошибка сервера',
  INVITE_FIELD_REQUIRE: 'Поля to и trainingId обязательны!'
};

const MESSAGES = {
  DELETE_INVITE_SUCCESSFULL_MESSAGE: 'The invite has been deleted',
};

const INVITE_STATUS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected'
};

module.exports = { ERRORS, MESSAGES, INVITE_STATUS };