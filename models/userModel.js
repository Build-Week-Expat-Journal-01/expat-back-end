const db = require('../data/dbConfig');

module.exports = {
  find,
  findBy,
  findById,
  add
}

function find() {
  return db('users').select('id', 'username');
}

function findBy(username) {
  return db('users').where({ username }).first();
}

function findById(id) {
  return db('users').where({ id }).first();
}

function add(user) {
  return db('users').insert(user);
}