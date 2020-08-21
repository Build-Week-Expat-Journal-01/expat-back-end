const Story = require('../models/storyModel');
const Photo = require('../models/photoModel');
const catchAsync = require('../utils/catchAsync');

exports.addStory = catchAsync(async (req, res, next) => {
  const newStory = await Story.add(req.body);

  res.status(201).json({
    status: 'success',
    story: newStory
  })
})

exports.readStories = catchAsync(async (req, res, next) => {
  const stories = await Story.find();

  res.status(200).json({
    status: 'success',
    stories
  })
})

exports.readStoryById = catchAsync(async (req, res, next) => {
  const story = await Story.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    story
  })
})

exports.updateStory = catchAsync(async (req, res, next) => {
  const updatedStory = await Story.update(req.params.id, req.body);

  res.status(200).json({
    status: 'success',
    story: updatedStory
  })
})

exports.deleteStory = catchAsync(async (req, res, next) => {
  const result = await Story.remove(req.params.id);

  res.status(204).json({
    status: 'success',
    result
  })
})

exports.addPhoto = catchAsync(async (req, res, next) => {
  const newPhoto = await Photo.add(req.body);

  res.status(201).json({
    status: 'success',
    photo: newPhoto
  })
})

exports.readPhotos = catchAsync(async (req, res, next) => {
  const photos = await Photo.find();

  res.status(200).json({
    status: 'success',
    photos
  })
})

exports.readPhotoById = catchAsync(async (req, res, next) => {
  const photo = await Photo.findById(req.params.pid);

  res.status(200).json({
    status: 'success',
    photo
  })
})

exports.updatePhoto = catchAsync(async (req, res, next) => {
  const updatedPhoto = await Photo.update(req.params.pid, req.body);

  res.status(200).json({
    status: 'success',
    photo: updatedPhoto
  })
})

exports.deletePhoto = catchAsync(async (req, res, next) => {
  const result = await Photo.remove(req.params.pid);

  res.status(204).json({
    status: 'success',
    result
  })
})

