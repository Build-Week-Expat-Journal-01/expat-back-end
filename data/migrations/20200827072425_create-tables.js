
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', users => {
      users.increments();
      users
        .string('username', 128)
        .notNullable()
        .unique();
      users
        .string('password', 128)
        .notNullable();
      users
        .string('role', 128)
        .notNullable()
        .defaultTo('user');
    }),
    knex.schema.createTable('stories', stories => {
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
        .foreign('user_id').references('id').inTable('users').onDelete();
    }),
    knex.schema.createTable('photos', photos => {
      photos.increments();
      photos
        .text('image_url')
        .notNullable();
      photos
        .text('desc')
        .notNullable();
      photos
        .integer('story_id').unsigned().notNullable();
      photos
        .datetime('created_at')
        .defaultTo(knex.fn.now());
      photos
        .foreign('story_id')
        .references('id')
        .inTable('stories')
        .onDelete();
    })
  ]);
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('stories'),
    knex.schema.dropTableIfExists('photos')
  ])
};
