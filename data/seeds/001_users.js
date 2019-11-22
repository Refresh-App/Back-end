const faker = require('faker');

const createFakeUser = () =>({
  email: faker.internet.email(),
  password: 'roman'
})

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {

        const fakeUsers = []
        const userCount = 500

        for(let i = 0; i < userCount; i++){
          fakeUsers.push(createFakeUser())
        }
        // Inserts seed entries
        return knex('users').insert(fakeUsers);
      });
  };
  