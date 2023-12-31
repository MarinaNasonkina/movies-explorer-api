const { CODE_UNAUTHORIZED } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
