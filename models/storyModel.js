const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findByUserId,
  add,
  update,
  remove
}

function find() {
  return db('stories');
}

function findByUserId(user_id) {
  return db('stories').where({ user_id });
}

function findById(id) {
  return db('stories').where({ id }).first();
}

function add(story) {
  return db('stories').insert(story, 'id');
}

function update(id, story) {
  return db('stories').where({ id }).update({
    title: story.title,
    teaser: story.teaser,
    content: story.content
  });
}

function remove(id) {
  return db('stories').where({ id }).del();
}