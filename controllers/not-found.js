const NotFoundError = require('../errors/not-found-err');

const { MSG_PAGE_NOT_FOUND } = require('../utils/constants');

module.exports = (req, res, next) => {
  next(new NotFoundError(MSG_PAGE_NOT_FOUND));
};
