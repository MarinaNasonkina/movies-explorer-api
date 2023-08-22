const { Schema, model } = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UnauthorizedError = require('../errors/unauthorized-err');

const {
  MSG_REQUIRED_FIELD,
  MSG_INCORRECT_EMAIL,
  MSG_MIN_LENGTH,
  MSG_MAX_LENGTH,
  MSG_WRONG_USER_DATA,
} = require('../utils/constants');

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, MSG_REQUIRED_FIELD],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: MSG_INCORRECT_EMAIL,
      },
    },
    password: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
      select: false,
    },
    name: {
      type: String,
      required: [true, MSG_REQUIRED_FIELD],
      minlength: [2, MSG_MIN_LENGTH],
      maxlength: [30, MSG_MAX_LENGTH],
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .orFail()
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(MSG_WRONG_USER_DATA);
        }
        return user;
      }));
};

module.exports = model('user', userSchema);
