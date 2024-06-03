// utils/auth.js
const jwt = require('jsonwebtoken');

const secret = 'mysecrets';
const expiration = '2h';

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    if (req.body.operationName === 'login' || req.body.operationName === 'addUser') {
      return req;
    }

    if (token) {
      token = token.split(' ').pop().trim();
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');
      }
    }

    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
