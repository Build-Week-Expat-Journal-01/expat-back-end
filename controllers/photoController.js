const Photo = require('../models/photoModel');
const catchAsync = require('../utils/catchAsync');

exports.addPhotos = catchAsync(async (req, res, next) => {
  const newPhotos = await Photo.add(req.body);

  res.status(201).json({
    status: 'success',
    photos: newPhotos
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

