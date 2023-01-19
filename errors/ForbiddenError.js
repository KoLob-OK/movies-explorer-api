const { STATUS_CODES } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message = 'Ошибка 403. Доступ к запрошенному ресурсу запрещён') {
    super(message);
    this.statusCode = STATUS_CODES.NOT_FOUND;
  }
}

module.exports = { ForbiddenError };
