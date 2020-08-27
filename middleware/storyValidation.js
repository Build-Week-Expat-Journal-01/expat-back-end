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

exports.validateReq = (req, res, next) => {
  const { title, teaser, content, photos } = req.body

  if (!title || !teaser || !content) {
    return next({
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

    return next();
  }
}

exports.validateStoryId = catchAsync(async (req, res, next) => {
  const { subject } = req.decodedJwt;
  const id = req.params.id;

  const story = await Story.findById(id);

  if (story) {
    if (story.user_id === subject) {
      return next();
    } else {
      return next({
        status: 'fail',
        statusCode: 403,
        message: 'You are not authorized.'
      })
    }
  } else {
    return next({
      status: 'fail',
      statusCode: 404,
      message: 'Story is not found.'
    })
  }
});

exports.validatePhotoReq = (req, res, next) => {
  if (invalidPhotoFields(req.body)) {
    return next({
      status: 'fail',
      statusCode: 400,
      message: 'Photo fields are missing or invalid.'
    });
  } else {
    return next();
  }
};

