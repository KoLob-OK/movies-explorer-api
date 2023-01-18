const regexUrl = /http(s?):\/\/(www\.)?[0-9a-zA-Z-]+\.[a-zA-Z]+([0-9a-zA-Z-._~:/?#[\]@!$&'()*+,;=]+)/;

const {
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
} = process.env;

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ERROR_MESSAGES = {
  CONFLICT_USER: 'Ошибка 409. Пользователь с указанным email уже существует',
  CONFLICT_MOVIE: 'Ошибка 409. Фильм с указанным id уже существует',
  FORBIDDEN: 'Ошибка 403. Удаление чужого фильма запрещено',
  NOT_FOUND_USER: 'Ошибка 404. Пользователь не найден',
  NOT_FOUND_MOVIE: 'Ошибка 404. Фильм не найден',
  NOT_FOUND_PAGE: 'Ошибка 404. Введен некорректный адрес',
  BAD_REQUEST_USER: 'Ошибка 400. Переданы некорректные данные',
  BAD_REQUEST_MOVIE_CREATE: 'Ошибка 400. Переданы некорректные данные при создании фильма',
  BAD_REQUEST_MOVIE_DELETE: 'Ошибка 400. Переданы некорректные данные при удалении фильма',
  UNAUTHORIZED_AUTH: 'Ошибка 401. Необходима авторизация',
  INCORRECT_DATA: 'Ошибка 401. Неправильные почта или пароль',
  INTERNAL_SERVER_ERROR: 'Ошибка 500. На сервере произошла ошибка',
};

module.exports = {
  regexUrl,
  PORT,
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
  STATUS_CODES,
  ERROR_MESSAGES,
};
