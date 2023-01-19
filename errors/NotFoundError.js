const { STATUS_CODES } = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message = 'Ошибка 404. Ресурс не найден') {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

module.exports = { NotFoundError };
