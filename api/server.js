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

// the root route or no routes found
server.use('/', (req, res) => {
  res.json({ message: 'Build Week: Expat Journal 1.' })
});

// global error controller
server.use("/", errorController);

module.exports = server;
