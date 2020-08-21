
exports.up = function(knex) {
  return knex.schema.createTable('photos', photos => {
    photos.increments();
    photos
      .string('image_url')
      .notNullable();
    photos
      .integer('story_id').unsigned().notNullable();
    photos
      .foreign('story_id').references('id').inTable('stories');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('photos');
};

