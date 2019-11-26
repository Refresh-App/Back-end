const bcrypt = require('bcrypt')
const HashFactor = 8
const URL = process.env.ROOT_URL

const createFakeUser = (count) =>({
  email: `testyMcTester${count}@${URL}`,
  password:  bcrypt.hashSync('roman', HashFactor)
})

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {

        const fakeUsers = []
        const userCount = 6

        for(let i = 0; i < userCount; i++){
          fakeUsers.push(createFakeUser(i))
        }
        // Inserts seed entries
        return knex('users').insert(fakeUsers);
      });
  };
  