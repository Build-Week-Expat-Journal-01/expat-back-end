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

function add(photo) {
  return db('photos').insert(photo);
}

function update(id, photo) {
  return db('photos').where({ id }).update({
    image_url: photo.image_url
  })
}

function remove(id) {
  return db('photos').where({ id }).del();
}