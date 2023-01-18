const Movie = require('../models/movie');

const { ErrorHandler } = require('../errors/handleError');

const statusCode = {
  ok: 200,
  created: 201,
};

// GET /movies - получение всех сохранённых текущим пользователем фильмов
const getMovies = async (req, res, next) => {
  console.log('getMovies');
  try {
    const movies = await Movie.find({}).populate('owner');
    res.status(statusCode.ok).send(movies.reverse());
    console.log('-successful getting of the movies-');
  } catch (err) {
    next(err);
  }
};

// POST /movies - сохранение фильма
const createMovie = async (req, res, next) => {
  console.log('createMovie');
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  try {
    const ownerId = req.user._id;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: ownerId,
    });
    await movie.populate('owner');
    res.status(statusCode.created).send({ movie, message: 'Фильм успешно добавлен' });
    console.log('-successful movie creation-');
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new ErrorHandler(400, 'Ошибка 400. Переданы некорректные данные при создании фильма'));
    }
    next(err);
  }
};

// DELETE /movies/_id - удаление сохранённого фильма по id
const deleteMovie = async (req, res, next) => {
  console.log('deleteMovie');
  try {
    const { movieId } = req.params;
    const userId = req.user._id;
    const movie = await Movie
      .findById(movieId)
      .orFail(new ErrorHandler(404, 'Ошибка 404. Фильм не найден'))
      .populate('owner');
    const ownerId = movie.owner._id.toString();
    if (ownerId !== userId) {
      next(new ErrorHandler(403, 'Ошибка 403. Удаление чужого фильма запрещено'));
      return;
    }
    await Movie.findByIdAndRemove(movieId);
    res.status(statusCode.ok).send({ movie, message: 'Фильм успешно удален' });
    console.log('-successful movie deletion-');
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new ErrorHandler(400, 'Ошибка 400. Переданы некорректные данные при удалении фильма'));
    }
    next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
