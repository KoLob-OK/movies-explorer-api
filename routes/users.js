const usersRouter = require('express').Router();
const { updateUserValidation } = require('../middlewares/validations');

const {
  getCurrentUser,
  updateUser,
} = require('../controllers/users');

usersRouter.get('/me', getCurrentUser);

usersRouter.patch('/me', updateUserValidation, updateUser);

module.exports = usersRouter;