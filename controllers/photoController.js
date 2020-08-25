const Story = require('../models/storyModel');
const Photo = require('../models/photoModel');
const catchAsync = require('../utils/catchAsync');

exports.addPhotos = catchAsync(async (req, res, next) => {
  const { subject } = req.decodedJwt;
  const story = await Story.findById(req.params.id);

  if (story) {
    if (story.user_id === subject) {
      req.body.story_id === req.params.id;
      const newPhotos = await Photo.add(req.body);

      res.status(201).json({
        status: 'success',
        photos: newPhotos
      })
    } else {
      next({
        status: 'fail',
        statusCode: 403,
        message: 'You are not authorized to add photo in that story.'
      })
    }  
  } else {
    next({
      status: 'fail',
      statusCode: 404,
      message: 'The story is not found.'
    })
  }
})

exports.deletePhoto = catchAsync(async (req, res, next) => {
  const { subject } = req.decodedJwt;
  const story = await Story.findById(req.params.id);

  if (story) {
    if (story.user_id === subject) {
      const result = await Photo.remove(req.params.pid);

      if (result) {
        res.status(204).json({
          status: 'success',
          message: 'The photo has been removed.'
        })
      } else {
        next({
          status: 'fail',
          statusCode: 404,
          message: 'The photo is not found.'
        })
      }

    } else {
      next({
        status: 'fail',
        statusCode: 403,
        message: 'You are not authorized to delete that photo.'
      })
    }

  } else {
    next({
      status: 'fail',
      statusCode: 404,
      message: 'The story is not found.'
    })
  }
})

