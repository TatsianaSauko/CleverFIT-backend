const ERRORS = {
  BAD_REQUEST: 'Ошибка в запросе',
  SERVER_ERROR: 'Ошибка сервера',
  INVITE_FIELD_REQUIRE: 'Поля to и trainingId обязательны!',
  INVITE_NOT_FOUND: 'Приглашение не найдено'
};

const MESSAGES = {
  DELETE_INVITE_SUCCESSFULL_MESSAGE: 'Приглашение было удалено',
};

const INVITE_STATUS = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected'
};

module.exports = { ERRORS, MESSAGES, INVITE_STATUS };