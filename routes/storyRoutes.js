const express = require('express');
const storyController = require('../controllers/storyController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.authenticate, storyController.readStories);

module.exports = router;