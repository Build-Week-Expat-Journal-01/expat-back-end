exports.up = function(knex) {
  return knex.schema.createTable('photos', photos => {
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
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('photos');
};

