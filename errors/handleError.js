class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Ошибка 500. На сервере произошла ошибка' : err.message;
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
  });
  next();
};

module.exports = {
  ErrorHandler,
  handleError,
};
