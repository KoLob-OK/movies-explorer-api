require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const { errors } = require('celebrate');

const { limiterConfig } = require('./utils/constants');
const { handleError } = require('./errors/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit(limiterConfig);

app.use(express.json());
app.use(cors());
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(helmet());

mongoose
  .connect('mongodb://localhost:27017/bitfilmsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(() => {
    console.log('Database connection error');
  });

app.use(router);

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App  listening on port ${PORT}`);
});
