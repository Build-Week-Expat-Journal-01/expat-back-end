const Story = require('../models/storyModel');
const Photo = require('../models/photoModel');
const catchAsync = require('../utils/catchAsync');

exports.addPhotos = catchAsync(async (req, res, next) => {
  req.body.story_id = req.params.id;
  const newPhotos = await Photo.add(req.body);

  res.status(201).json({
    status: 'success',
    photos: newPhotos
  })
})

exports.deletePhoto = catchAsync(async (req, res, next) => {
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
})