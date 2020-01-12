require("dotenv").config();
const bcrypt = require("bcrypt");
const HashFactor = 8;
const URL = "apidevnow.com";

const seedTeam = [
  {

    email: `testuser0@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 1
  },
  {
    
    
    email: `testuser1@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 2
  },
  {
   
    email: `testuser2@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 3
  },
  {
    
    email: `testuser3@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 4
  },
  {

    email: `testuser4@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 5
  },
  {
  
    email: `testuser5@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 6
  }
];
const createFakeUser = seedTeam.map(function(member) {
  return {
  
    email: member.email,
    id: member.user_id,
    password: member.password
  };
});
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert(createFakeUser);
    });
};
