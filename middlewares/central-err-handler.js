const {
  CODE_INTERNAL_SERVER_ERR,
  MSG_SERVER_ERR,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = CODE_INTERNAL_SERVER_ERR, message } = err;

  res.status(statusCode).send({
    message: statusCode === CODE_INTERNAL_SERVER_ERR ? MSG_SERVER_ERR : message,
  });

  next();
};
