const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_SECRET_DEV } = require('../utils/devConfig');
const { ERROR_MESSAGES } = require('../utils/constants');

module.exports = (req, res, next) => {
  console.log('authorization');
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  console.log({ authorization });
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED_AUTH));
    return;
  }

  // если токен на месте, то извлечём его
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production'
      ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthorizedError(ERROR_MESSAGES.UNAUTHORIZED_AUTH));
    return;
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  console.log(req.user);

  next(); // пропускаем запрос дальше
};
