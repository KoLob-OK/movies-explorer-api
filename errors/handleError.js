const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constants');

const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || STATUS_CODES.INTERNAL_SERVER_ERROR;
  const message = statusCode === STATUS_CODES.INTERNAL_SERVER_ERROR
    ? ERROR_MESSAGES.INTERNAL_SERVER_ERROR : err.message;
  res.status(statusCode)
    .json({
      status: 'error',
      statusCode,
      message,
    });
  next();
};

module.exports = { handleError };
