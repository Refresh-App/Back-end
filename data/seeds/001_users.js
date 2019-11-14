exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('user_roles').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('user_roles').insert([
          {email: "email@MediaList.com", password: "password"},
          {email: "email@testmail.com", password: "password"},
   
        ]);
      });
  };
  