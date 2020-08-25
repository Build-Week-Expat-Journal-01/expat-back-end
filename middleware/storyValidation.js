const User = require('../models/userModel');
const Story = require('../models/storyModel');
const Photo = require('../models/photoModel');
const catchAsync = require('../utils/catchAsync');

function invalidPhotoFields(photo) {
  const { image_url, desc } = photo;
  if (!image_url || !desc) {
    return true
  } else {
    return false
  }
}

exports.validateReq = catchAsync(async (req, res, next) => {
  const { title, teaser, content, photos } = req.body

  if (!title || !teaser || !content) {
    next({
      status: 'fail',
      statusCode: 400,
      message: 'Story fields are missing or invalid.'
    });
  } else {
    if (photos && photos.length > 0) {
      for (let i = 0; i < photos.length; i++) {
        if (invalidPhotoFields(photos[i])) {
          req.body.photos = false;
          break;
        }
      }
    } else {
      req.body.photos = false;
    }

    next();
  }
})

exports.validateStoryId = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const story = await Story.findById(id);

  if (story) {
    next()
  } else {
    next({
      status: 'fail',
      statusCode: 404,
      message: 'Story is not found.'
    })
  }
});

