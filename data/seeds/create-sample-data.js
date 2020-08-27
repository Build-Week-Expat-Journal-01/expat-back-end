
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return Promise.all([
    // knex('photos').del()
    //   .then(function () {
    //     // Inserts seed entries
    //     return knex('photos').insert([      
    //       {
    //         id: 1,
    //         image_url: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2020%2F06%2F30%2Fbermuda-US0620.jpg",
    //         desc: "Stonehole Bay in Bermuda. PHOTO BERMUDA TOURISM AUTHORITY",
    //         story_id: 1
    //       }
    //     ]);
    //   }),
    // knex('stories').del()
    //   .then(function () {
    //     // Inserts seed entries
    //     return knex('stories').insert([
    //       {
    //         id: 1,
    //         title: "Where Can Americans Travel Right Now? A Country-by-Country Guide: Bermuda",
    //         teaser: "Bermuda, a British territory, reopened for all international travel on July 1 and requires entering visitors to show a negative COVID-19 test from no more than seven days before departure, according to the Bermuda Tourism Authority...",
    //         content: "Additionally, visitors have to fill out a travel authorization process online and pay a $75 fee. Travelers will also be tested at the airport and have to quarantine at their accommodation until the results are ready, which typically takes six to eight hours.\nVisitors will then be tested every few days while on the island and be required to take their temperature twice each day and report it online.\nRestaurants on the island have been allowed to reopen and Bermuda's popular beaches are open with physical distancing measures in place. On July 1, the island entered Phase 4, increasing gatherings to 50 people and reopening bars, according to the government.",
    //         user_id: 1
    //       }  
    //     ]);
    //   }),
    knex('users').del()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          { 
            id: 1,
            username: "testing01", 
            password: "$2a$10$Z/zdFjHNRE9u6NPwKT3.pOvyBFb/Up7h2jE.PohXJAgmeZY1jEXgK"
          }
        ]);
      })
  ])
};
