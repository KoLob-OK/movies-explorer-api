const express = require('express');
const mongoose = require('mongoose');
const { celebrate, errors, Joi } = require('celebrate');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { ErrorHandler, handleError } = require('./errors/handleError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(() => {
    console.log('Database connection error');
  });

// Краш-тест сервера (запрос вызывает падение сервера для проверки его авт. восстановления)
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации (регистрация и логин)
app.post('/signin', celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
app.post('/signup', celebrate({
  // валидируем тело запроса
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
  }),
}), createUser);

// роуты, которым авторизация нужна
app.use(auth);
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

// запрос к ошибочному роуту
app.use('*', (req, res, next) => {
  next(new ErrorHandler(404, 'Ошибка 404. Введен некорректный адрес'));
});

app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App  listening on port ${PORT}`);
});