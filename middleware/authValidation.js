const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.validateReq = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next({
      status: 'fail',
      statusCode: 400,
      message: 'username or password field is missing.'
    });
  } else if (username.length > 128) {
    return next({
      status: 'fail',
      statusCode: 400,
      message: 'Username is NO more than 128 characters.'
    })
  } else {
    return next();
  }
}

exports.validateUniqueUsername = catchAsync(async (req, res, next) => {
  const { username } = req.body;

  const result = await User.findBy(username);
  
  if (result) {
    return next({
      status: 'fail',
      statusCode: 409,
      message: 'Username is already existed.'
    })
  } else {
    return next();
  } 
})