
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          { 
            username: "testing01", 
            password: "$2a$10$Z/zdFjHNRE9u6NPwKT3.pOvyBFb/Up7h2jE.PohXJAgmeZY1jEXgK"
          }
        ]);
      })
  ])
};
