const Story = require('../models/storyModel');
const Photo = require('../models/photoModel');
const catchAsync = require('../utils/catchAsync');

exports.addStory = catchAsync(async (req, res, next) => {
  const { photos, ...restOfTheBody } = req.body;

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

  const stories = await Story.find(subject);

  if (stories.length > 0) {
    for (let i = 0; i < stories.length; i++) {
      stories[i].photos = await Photo.findByStoryId(stories[i].id)
    }
  }

  res.status(200).json({
    status: 'success',
    stories
  })
})

exports.readStoryById = catchAsync(async (req, res, next) => {
  const story = await Story.findById(req.params.id);
  
  if (story) story.photos = await Photo.findByStoryId(story.id)

  res.status(200).json({
    status: 'success',
    story
  })
})

exports.updateStory = catchAsync(async (req, res, next) => {
  const { photos, ...restOfTheBody } = req.body;

  await Story.update(req.params.id, restOfTheBody);

  const story = await Story.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    story
  })
})

exports.deleteStory = catchAsync(async (req, res, next) => {
  await Photo.removeByStoryId(req.params.id);
  const result = await Story.remove(req.params.id);

  res.status(204).json({
    status: 'success',
    result
  })
})




