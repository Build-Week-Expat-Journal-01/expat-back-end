const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const generateToken = (user) => {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  };
  const secret = secrets.jwtSecret;
  const options = {
    expiresIn: '90d'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = generateToken;