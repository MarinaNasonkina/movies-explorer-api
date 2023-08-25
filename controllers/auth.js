const { ValidationError, DocumentNotFoundError } = require('mongoose').Error;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');

const {
  CODE_CREATED,
  MSG_SUCCESS_EXIT,
  MSG_USER_EXISTS,
  MSG_WRONG_USER_DATA,
  MSG_WRONG_DATA,
} = require('../utils/constants');
const { JWT_SECRET } = require('../utils/config');

function createUser(req, res, next) {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then(() => res.status(CODE_CREATED).send({
      email,
      name,
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequestError(MSG_WRONG_DATA));
      } else if (err.code === 11000) {
        next(new ConflictError(MSG_USER_EXISTS));
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;

  User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('token', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch((err) => {
      if (err instanceof DocumentNotFoundError) {
        next(new UnauthorizedError(MSG_WRONG_USER_DATA));
      } else {
        next(err);
      }
    });
}

function logout(req, res, next) {
  try {
    res
      .clearCookie('token', {
        httpOnly: true,
        sameSite: true,
      })
      .send({ message: MSG_SUCCESS_EXIT });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  login,
  logout,
};
