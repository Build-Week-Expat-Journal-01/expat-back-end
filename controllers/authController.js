const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');
const generateToken = require('../utils/generateToken');
const catchAsync = require('../utils/catchAsync');

exports.register = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const hash = bcrypt.hashSync(password);
  let user = {};
  user.username = username;
  user.password = hash;
  
  const newUser = await User.add(user);

  res.status(201).json({
    status: 'success',
    message: `Registered successfully. Welcome, ${user.username}.`
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const found = await User.findBy(username);

  if (found && bcrypt.compareSync(password, found.password)) {
    const token = generateToken(found);

    res.status(201).json({
      message: `Welcome, ${found.username}.`,
      token
    })
  } else {
    next({
      status: 'fail',
      statusCode: 401,
      message: 'Invalid username or password.'
    })
  }
});

exports.authenticate = (req, res, next) => {
  let token = null;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        next({
          status: 'fail',
          statusCode: 403,
          message: 'You are not authorized.'
        })
      } else {
        req.decodedJwt = decodedToken;
        next();
      }
    })
  } else {
    next({
      status: 'fail',
      statusCode: 403,
      message: 'You are not authorized.'
    })
  }
}