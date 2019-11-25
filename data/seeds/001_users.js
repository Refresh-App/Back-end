<<<<<<< HEAD
const bcrypt = require('bcrypt')
const HashFactor = 8
let count = '0'
const createFakeUser = () =>({
  email:`dfgf${Date.now()}d@gmail.com`,
=======
const faker = require('faker');
const bcrypt = require('bcrypt')
const HashFactor = 8

const createFakeUser = () =>({
  email: faker.internet.email(),
>>>>>>> 31d76e90138d6553c3d06c825baae867be44d36d
  password:  bcrypt.hashSync('roman', HashFactor)
})

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
      .then(function () {

        const fakeUsers = []
        const userCount = 6

        for(let i = 0; i < userCount; i++){
          fakeUsers.push(createFakeUser())
        }
        // Inserts seed entries
        return knex('users').insert(fakeUsers);
      });
  };
  