const User = require('../models/user');
const { ErrorHandler } = require('../errors/handleError');

const statusCode = {
  ok: 200,
  created: 201,
};

// GET /users/me - получение инфо о текущем пользователе
const getCurrentUser = async (req, res, next) => {
  console.log('getCurrentUser');
  const { _id } = req.user;
  console.log({ _id });
  try {
    const user = await User.findById(_id);
    if (!user) {
      next(new ErrorHandler(404, 'Ошибка 404. Пользователь не найден'));
    }
    res.status(statusCode.ok).send(user);
    console.log('Текущий пользователь загружен');
  } catch (err) {
    next(err);
  }
};

// PATCH /users/me - обновление данных пользователя
const updateUser = async (req, res, next) => {
  console.log('updateUser');
  const { name, about } = req.body;
  const ownerId = req.user._id;
  try {
    const user = await User.findByIdAndUpdate(
      ownerId,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      next(new ErrorHandler(404, 'Ошибка 404. Пользователь не найден'));
    }
    res.status(statusCode.ok).send(user);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new ErrorHandler(400, 'Ошибка 400. Неверные данные'));
    }
    next(err);
  }
};

module.exports = {
  getCurrentUser,
  updateUser,
};
