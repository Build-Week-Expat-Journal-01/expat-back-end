const express = require('express');
const storyController = require('../controllers/storyController');
const authController = require('../controllers/authController');
const storyValidation = require('../middleware/storyValidation');
const photoController = require('../controllers/photoController');

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
  .post(
    authController.authenticate, 
    storyValidation.validateStoryId,
    photoController.addPhotos
  );
router
  .route('/:id/photos/:pid')
  .delete(authController.authenticate, photoController.deletePhoto);

module.exports = router;