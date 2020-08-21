module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.DB_ENV === 'development') { 
    sendErrorDev(err, res) 
  } else if (process.env.DB_ENV === 'production') { 
    sendErrorProd(err, res) 
  } else {
    res.status(500).json({
      status: 'error',
      info: err
    })
  }
}

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    info: err,
    stack: err.stack
  });
}

const sendErrorProd = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    info: err
  });
}