const router = require('express').Router();
const { signInValidation, signUpValidation } = require('../middlewares/validations');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { ErrorHandler } = require('../errors/handleError');
const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constants');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

// Краш-тест сервера (запрос вызывает падение сервера для проверки его авт. восстановления)
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации (регистрация и логин)
router.post('/signin', signInValidation, login);
router.post('/signup', signUpValidation, createUser);

// роуты, которым авторизация нужна
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

// запрос к ошибочному роуту
router.use((req, res, next) => {
  next(new ErrorHandler(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.NOT_FOUND_PAGE));
});

module.exports = router;
