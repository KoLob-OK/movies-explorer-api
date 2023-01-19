const { STATUS_CODES } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message = 'Ошибка 400. Неверный формат данных') {
    super(message);
    this.statusCode = STATUS_CODES.BAD_REQUEST;
  }
}

module.exports = { BadRequestError };
