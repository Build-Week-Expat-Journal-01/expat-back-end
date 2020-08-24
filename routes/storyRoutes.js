const express = require('express');
const storyController = require('../controllers/storyController');
const authController = require('../controllers/authController');
const storyValidation = require('../middleware/storyValidation');

const router = express.Router();

router
  .route('/')
  .get(authController.authenticate, storyController.readStories)
  .post(
    authController.authenticate, 
    storyValidation.validateReq, 
    storyController.addStory
  );

router
  .route('/:id')
  .get(
    authController.authenticate,
    storyValidation.validateStoryId, 
    storyController.readStoryById
  )
  .put(
    authController.authenticate,
    storyValidation.validateReq,
    storyValidation.validateStoryId, 
    storyController.updateStory
  )
  .delete(
    authController.authenticate,
    storyValidation.validateStoryId, 
    storyController.deleteStory
  );

router
  .route('/:id/photos')
  .get(authController.authenticate, storyController.readPhotos)
  .post(authController.authenticate, storyController.addPhotos)

router
  .route('/:id/photos/:pid')
  .get(authController.authenticate, storyController.readPhotoById)
  .delete(authController.authenticate, storyController.deletePhoto);

module.exports = router;