const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}

function find() {
  return db('stories');
}

function findById(id) {
  return db('stories').where({ id }).first();
}

function add(story) {
  return db('stories').insert(story);
}

function update(id, story) {
  return db('stories').where({ id }).update(story);
}

function remove(id) {
  return db('stories').where({ id }).del();
}