const usersRouter = require('express').Router();

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);

usersRouter.patch('/me', updateUser);

module.exports = usersRouter;