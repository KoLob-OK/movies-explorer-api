const Movie = require('../models/movie');

const { BadRequestError } = require('../errors/BadRequestError');
const { NotFoundError } = require('../errors/NotFoundError');
const { ForbiddenError } = require('../errors/ForbiddenError');
const { ConflictError } = require('../errors/ConflictError');

const { STATUS_CODES, ERROR_MESSAGES } = require('../utils/constants');

// GET /movies - получение всех сохранённых текущим пользователем фильмов
const getMovies = async (req, res, next) => {
  console.log('getMovies');
  const owner = req.user._id;
  try {
    const movies = await Movie.find({ owner }).populate('owner');
    res.status(STATUS_CODES.OK).send(movies.reverse());
    console.log('-successful getting of the movies-');
    return;
  } catch (err) {
    next(err);
  }
};

// POST /movies - сохранение фильма
const createMovie = async (req, res, next) => {
  console.log('createMovie');
  try {
    const ownerId = req.user._id;
    const movie = await Movie.create({ ...req.body, owner: ownerId });
    await movie.populate('owner');
    res.status(STATUS_CODES.CREATED).send({ movie, message: 'Фильм успешно добавлен' });
    console.log('-successful movie creation-');
    return;
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST_MOVIE_CREATE));
      return;
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
      .orFail(new NotFoundError(ERROR_MESSAGES.NOT_FOUND_MOVIE))
      .populate('owner');
    const ownerId = movie.owner._id.toString();
    if (ownerId !== userId) {
      next(new ForbiddenError(ERROR_MESSAGES.FORBIDDEN));
      return;
    }
    await Movie.findByIdAndRemove(movieId);
    res.status(STATUS_CODES.OK).send({ movie, message: 'Фильм успешно удален' });
    console.log('-successful movie deletion-');
    return;
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(ERROR_MESSAGES.BAD_REQUEST_MOVIE_DELETE));
      return;
    }
    next(err);
  }
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
