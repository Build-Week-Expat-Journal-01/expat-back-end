const Story = require('../models/storyModel');
const Photo = require('../models/photoModel');
const catchAsync = require('../utils/catchAsync');

exports.addStory = catchAsync(async (req, res, next) => {
  const { subject } = req.decodedJwt;
  const { photos, ...restOfTheBody } = req.body;

  restOfTheBody.user_id = subject;

  const newStory = await Story.add(restOfTheBody);

  if (photos) {
    const newPhotos = photos.map(photo => {
      return { ...photo, story_id: newStory[0] }
    })
    await Photo.add(newPhotos);
  }
 
  res.status(201).json({
    status: 'success',
    story: newStory
  })
})

exports.readStories = catchAsync(async (req, res, next) => {
  const { subject } = req.decodedJwt;

  const stories = await Story.findByUserId(subject);

  if (stories.length > 0) {
    for (let i = 0; i < stories.length; i++) {
      stories[i].photos = await Photo.findByStoryId(stories[i].id)
    } 

    res.status(200).json({
      status: 'success',
      stories
    })
  } else {
    next({
      status: 'fail',
      statusCode: 404,
      message: 'There is no story has been created yet.'
    })
  }
})

exports.readStoryById = catchAsync(async (req, res, next) => {
  const { subject } = req.decodedJwt;

  const story = await Story.findById(req.params.id);
  
  if (story) {
    if (story.user_id === subject) {
      story.photos = await Photo.findByStoryId(story.id);

      res.status(200).json({
        status: 'success',
        story
      })
    } else {
      next({
        status: 'fail',
        statusCode: 403,
        message: 'You are not authorized to see that story.'
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

exports.updateStory = catchAsync(async (req, res, next) => {
  const { subject } = req.decodedJwt;

  const story = await Story.findById(req.params.id);

  if (story) {
    if (story.user_id === subject) {
      const { photos, ...restOfTheBody } = req.body;
      await Story.update(req.params.id, restOfTheBody);

      const updatedStory = await Story.findById(req.params.id);

      if (photos) {
        let found = null;
        const existingPhotos = await Photo.findByStoryId(req.params.id);
        for (let i = 0; i < photos.length; i++) {
          if (photos[i].id) {
            found = existingPhotos.find(photo => photo.id === photos[i].id);
            if (found) await Photo.update(found.id, photos[i])
          } else {
            await Photo.add({ 
              image_url: photos[i].image_url, 
              desc: photos[i].desc,
              story_id: req.params.id 
            })
          }
        }

        updatedStory.photos = await Photo.findByStoryId(story.id)
      }

      res.status(200).json({
        status: 'success',
        story: updatedStory
      })
    } else {
      next({
        status: 'fail',
        statusCode: 403,
        message: 'You are not authorized to update that story.'
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

exports.deleteStory = catchAsync(async (req, res, next) => {
  const { subject } = req.decodedJwt;
  const story = await Story.findById(req.params.id);

  if (story) {
    if (story.user_id === subject) {
      await Photo.removeByStoryId(req.params.id);
      await Story.remove(req.params.id);
      res.status(200).json({
        status: 'success',
        message: 'The story and its photos have been removed.'
      })
    } else {
      next({
        status: 'fail',
        statusCode: 403,
        message: 'You are not authorized to delete that story.'
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




