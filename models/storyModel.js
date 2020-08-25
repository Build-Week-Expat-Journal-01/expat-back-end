const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
}

function find(user_id) {
  return db('stories').where({ user_id });
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