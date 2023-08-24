const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

const { JWT_SECRET } = require('../utils/config');
const { MSG_NEED_AUTH } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { token } = req.cookies;

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError(MSG_NEED_AUTH));
  }

  req.user = payload;
  next();
};
