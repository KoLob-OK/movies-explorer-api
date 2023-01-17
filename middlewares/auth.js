const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../errors/handleError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  console.log('authorization');
  // достаём авторизационный заголовок
  const { authorization } = req.headers;
  console.log({ authorization });
  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ErrorHandler(401, 'Ошибка 401. Необходима авторизация'));
  }

  // если токен на месте, то извлечём его
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new ErrorHandler(401, 'Ошибка 401. Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  console.log(req.user);

  next(); // пропускаем запрос дальше
};
