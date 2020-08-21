
exports.up = function(knex) {
  return knex.schema.createTable('stories', stories => {
    stories.increments();
    stories
      .string('content')
      .notNullable();
    stories
      .integer('user_id').unsigned().notNullable();
    stories
      .foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('stories');
};
