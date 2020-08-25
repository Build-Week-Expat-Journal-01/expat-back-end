const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../routes/authRoutes');
const storyRouter = require('../routes/storyRoutes');
const errorController = require('../controllers/errorController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/stories', storyRouter);

// all other routes are not found
server.all('*', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.json({
      message: "Build Week: Expat Journal 1."
    })
  } else {
    next({
      status: 'fail',
      statusCode: 404,
      message: `Can't find ${req.originalUrl} on the server.`
    });
  }
})

// global error controller
server.use(errorController);

module.exports = server;
