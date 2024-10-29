const STATUS_CODES = {
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200,
  CREATED: 201,
};

const ERRORS = {
  AUTHORIZATION_MISSING: 'Отсутствует заголовок Authorization или токен не действителен.',
  SERVER_ERROR: 'Ошибка сервера.',
  BAD_REQUEST: 'Ошибка в запросе. Проверьте параметры и данные.',
  TOO_MANY_REQUESTS: 'Превышено максимальное количество запросов в минуту.',
  INVITE_NOT_FOUND: 'Invite not found', // Существующая ошибка
};

const MESSAGES = {
  FETCH_TRAINING_LIST_SUCCESS: 'Список тренировок успешно получен.',
  FETCH_TARIFFS_SUCCESS: 'Тарифные планы успешно получены.',
  DELETE_INVITE_SUCCESSFULL_MESSAGE: 'The invite has been deleted', // Существующее сообщение
};

const INVITE_STATUS = {
  WAITING: 'Waiting',
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
};

module.exports = { STATUS_CODES, ERRORS, MESSAGES, INVITE_STATUS };
