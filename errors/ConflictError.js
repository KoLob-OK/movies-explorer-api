const { STATUS_CODES } = require('../utils/constants');

class ConflictError extends Error {
  constructor(message = 'Ошибка 409. Конфликт переданных данных с данными в БД') {
    super(message);
    this.statusCode = STATUS_CODES.CONFLICT;
  }
}

module.exports = { ConflictError };
