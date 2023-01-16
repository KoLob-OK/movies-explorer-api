const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch(() => {
    console.log('Database connection error');
  });

// роуты, которым авторизация нужна
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

app.listen(PORT, () => {
  console.log(`App  listening on port ${PORT}`);
});