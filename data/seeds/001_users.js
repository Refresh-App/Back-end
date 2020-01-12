require("dotenv").config();
const bcrypt = require("bcrypt");
const HashFactor = 8;
const URL = "apidevnow.com";

const seedTeam = [
  {
    display_name: "McFacey",
    avatar:
      "https://res.cloudinary.com/thinkmode/image/upload/v1578593341/spongebob_rainbow_meme_video_16x9.0_qwjtjl.jpg",
    bio: "Be frands yeeeeeet",
    email: `testuser0@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 1
  },
  {
    display_name: "Bob",
    avatar:
      "https://res.cloudinary.com/thinkmode/image/upload/v1578802931/dog_wyubak.jpg",
    bio: "Where are the cookies?",
    email: `testuser1@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 2
  },
  {
    display_name: "Jamie",
    avatar:
      "https://res.cloudinary.com/thinkmode/image/upload/v1578802931/party_w45wo9.jpg",
    bio: "Where's my car dude?",
    email: `testuser2@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 3
  },
  {
    display_name: "Charlotte",
    avatar:
      "https://res.cloudinary.com/thinkmode/image/upload/v1578802931/skull_fyf6v7.jpg",
    bio: "Code or die",
    email: `testuser3@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 4
  },
  {
    display_name: "Joe Bob Dandy",
    avatar:
      "https://res.cloudinary.com/thinkmode/image/upload/v1578802930/jeebs_zmtsqs.jpg",
    bio: "What day is it?",
    email: `testuser4@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 5
  },
  {
    display_name: "Lucy",
    avatar:
      "https://res.cloudinary.com/thinkmode/image/upload/v1578803665/naughty_vt26fs.jpg",
    bio: "-_-",
    email: `testuser5@${URL}`,
    password: bcrypt.hashSync("roman", HashFactor),
    user_id: 6
  }
];
const createFakeUser = seedTeam.map(function(member) {
  return {
    display_name: member.display_name,
    avatar: member.avatar,
    bio: member.bio,
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
