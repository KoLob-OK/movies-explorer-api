const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const { ErrorHandler } = require('../errors/handleError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Неверный формат данных',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      // не нашёлся — отклоняем промис
      if (!user) {
        return Promise.reject(new ErrorHandler(401, 'Неправильные почта или пароль'));
      }

      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            // не совпали - отклоняем промис
            return Promise.reject(new ErrorHandler(401, 'Неправильные почта или пароль'));
          }
          // совпали - возвращаем пользователя
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);