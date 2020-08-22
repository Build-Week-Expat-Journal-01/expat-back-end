const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}

function find() {
  return db('photos');
}

function findById(id) {
  return db('photos').where({ id }).first();
}

function add(photos) {
  return db('photos').insert(photos);
}

function update(id, photo) {
  return db('photos').where({ id }).update({
    image_url: photo.image_url
  })
}

function remove(id) {
  return db('photos').where({ id }).del();
}

function removeByStoryId(story_id) {
  return db('photos').where({ story_id }).del();
}