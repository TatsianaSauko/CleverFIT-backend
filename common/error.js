const { StatusCodes, getReasonPhrase } = require('http-status-codes');
const { ERRORS } = require('../common/constants');

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  let { statusCode, message } = err;
  let error = getReasonPhrase(statusCode);
  
  if (!(err instanceof ErrorHandler)) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    error = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
    message = ERRORS.SERVER_ERROR; 
  }
  res.status(statusCode).send({ statusCode, error, message });
};

module.exports = {
  ErrorHandler,
  handleError
};