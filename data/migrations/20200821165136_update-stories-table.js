exports.up = function(knex) {
  return knex.schema.createTable('stories', stories => {
    stories.increments();
    stories
      .string('title')
      .notNullable();
    stories
      .string('teaser')
      .notNullable();
    stories
      .text('content')
      .notNullable();
    stories
      .datetime('created_at')
      .defaultTo(knex.fn.now());
    stories
      .integer('user_id').unsigned().notNullable();
    stories
      .foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('stories');
};