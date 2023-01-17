const moviesRouter = require('express').Router();

const { createMovieValidation, movieIdValidation } = require('../middlewares/validations');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);

moviesRouter.post('/', createMovieValidation, createMovie);

moviesRouter.delete('/:movieId', movieIdValidation, deleteMovie);

module.exports = moviesRouter;