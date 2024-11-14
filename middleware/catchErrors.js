const { handleError } = require('../common/error');

module.exports = fn => async (req, res, next) => {
    try {
      return await fn(req, res, next);
    } catch (err) {
        return handleError(err, res);
    }
  };