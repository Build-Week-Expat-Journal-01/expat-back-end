const express = require('express');
const storyController = require('../controllers/storyController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(authController.authenticate, storyController.readStories)
  .post(authController.authenticate, storyController.addStory);

router
  .route('/:id')
  .get(authController.authenticate, storyController.readStoryById)
  .put(authController.authenticate, storyController.updateStory)
  .delete(authController.authenticate, storyController.deleteStory);

router
  .route('/:id/photos')
  .get(authController.authenticate, storyController.readPhotos)
  .post(authController.authenticate, storyController.addPhoto)

router
  .route('/:id/photos/:pid')
  .get(authController.authenticate, storyController.readPhotoById)
  .delete(authController.authenticate, storyController.deletePhoto);

module.exports = router;