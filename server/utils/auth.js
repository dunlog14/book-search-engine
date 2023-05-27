const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    if (!token) {
      throw new AuthenticationError('Missing authentication token');
    }

    try {
      const decoded = jwt.verify(token, secret);
      req.user = decoded.data;
    } catch (err) {
      throw new AuthenticationError('Invalid authentication token');
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
