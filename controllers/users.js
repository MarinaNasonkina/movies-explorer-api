const { DocumentNotFoundError } = require('mongoose').Error;

const User = require('../models/user');

const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');

const { MSG_USER_EXISTS, MSG_USER_NOT_FOUND } = require('../utils/constants');

function getMe(req, res, next) {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(MSG_USER_NOT_FOUND));
      } else {
        next(err);
      }
    });
}

function updateProfile(req, res, next) {
  const { email, name } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new NotFoundError(MSG_USER_NOT_FOUND));
      } else if (err.code === 11000) {
        next(new ConflictError(MSG_USER_EXISTS));
      } else {
        next(err);
      }
    });
}

module.exports = {
  getMe,
  updateProfile,
};
