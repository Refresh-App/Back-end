exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("profile")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("profile").insert([
        {
          user_id: 1,
          display_name: "McFacey",
          avatar:
            "https://res.cloudinary.com/thinkmode/image/upload/v1578593341/spongebob_rainbow_meme_video_16x9.0_qwjtjl.jpg",
          fname: "McFacey",
          lname: "BigFace",
          bio: "Be frands yeeeeeet",
          cohort: "web22-yo"
        },
        {
          user_id: 2,
          display_name: "Bob",
          avatar:
            "https://res.cloudinary.com/thinkmode/image/upload/v1578802931/dog_wyubak.jpg",
          fname: "Bob",
          lname: "Bobberton",
          bio: "Where are the cookies?",
          cohort: "web22-yo"
        },
        {
          user_id: 3,
          display_name: "Jamie",
          avatar:
            "https://res.cloudinary.com/thinkmode/image/upload/v1578802931/party_w45wo9.jpg",
          bio: "Where's my car dude?",
          fname: "Jamie",
          lname: "Loosecannon",
          cohort: "web22-yo"
        },
        {
          user_id: 4,
          display_name: "Charlotte",
          avatar:
            "https://res.cloudinary.com/thinkmode/image/upload/v1578802931/skull_fyf6v7.jpg",
          bio: "Code or die",
          fname: "Charlotte",
          lname: "Pigeontoe",
          cohort: "web22-yo"
        },
        {
          user_id: 5,
          display_name: "Joe Bob Dandy",
          avatar:
            "https://res.cloudinary.com/thinkmode/image/upload/v1578802930/jeebs_zmtsqs.jpg",
          bio: "What day is it?",
          fname: "Joe Bob",
          lname: "Dandy",
          cohort: "web22-yo"
        },
        {
          user_id: 6,
          display_name: "Lucy",
          avatar:
            "https://res.cloudinary.com/thinkmode/image/upload/v1578803665/naughty_vt26fs.jpg",
          bio: "-_-",
          fname: "Lucy",
          lname: "Wrekemall",
          cohort: "web22-yo"
        }
      ]);
    });
};
