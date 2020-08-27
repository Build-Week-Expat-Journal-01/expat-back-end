const User = require('../models/userModel');
const { promisify } = require('util');
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

  let token = "";

  if (newUser) {
    token = generateToken({ id: newUser[0], username: user.username })
    user.id = newUser[0];
  };

  res.status(201).json({
    status: 'success',
    message: `Registered successfully. Welcome, ${user.username}.`,
    token,
    user: {
      id: newUser ? newUser[0] : undefined,
      username: user.username
    } 
  })
})

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  const found = await User.findBy(username);

  if (found && bcrypt.compareSync(password, found.password)) {
    const token = generateToken(found);

    res.status(200).json({
      message: `Welcome back, ${found.username}.`,
      token,
      user: {
        id: found.id,
        username: found.username
      } 
    })
  } else {
    return next({
      status: 'fail',
      statusCode: 401,
      message: 'Invalid username or password.'
    })
  }
});

exports.authenticate = catchAsync(async (req, res, next) => {
  let token = null;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  
  if (token) {
    const decodedToken = await promisify(jwt.verify)(token, secrets.jwtSecret);
    
    const currentUser = await User.findById(decodedToken.subject);

    if (!currentUser) {
      return next({
        status: 'fail',
        statusCode: 403,
        message: 'You are not authorized.'
      })
    } else {
      req.decodedJwt = decodedToken;
      return next();
    }
  } else {
    return next({
      status: 'fail',
      statusCode: 403,
      message: 'You are not authorized.'
    })
  }
})