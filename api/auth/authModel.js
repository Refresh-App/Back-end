const db = require(_dbConfig);
const profileModel = require("../private/profile/profileModle");
const bcrypt = require("bcrypt");
const rolesModel = require("../private/roles/roles-model");
const userMissionsModel = require("../private/user_missions/userMissionsModel");
const teamsModel = require('../private/teams/teamModel')
module.exports = {
  addUser,
  findByEmail,
  findById,
  findOrCreateByEmail,
  removeUser
};

//Nice to declare Tables up top Yo, including sub tables
const table = "users";

function findById(id) {
  return db(table)
    .select("*")
    .where({ id })
    .first();
}

function findByEmail(email) {
  return db(table + " as u")
    .select("u.id", "u.email", "u.password")
    .where({ email })
    .first();
}

async function findOrCreateByEmail(profile) {
  //Get the proposed user
  const email = profile.email;
  const user = await db(table)
    .select("email", "id")
    .where({ email })
    .first();

  //If the user exist
  if (user) {
    const user_missions = await userMissionsModel.findAll(user.id);
    const user_profile = await profileModel.findByUserId(user.id);
    const my_teams =  await teamsModel.findAll(user.id)

    return {
      user_id: user.id,
      user_profile,
      ...user_missions,
      message: "Welcome Back",
      my_teams
    };
  } else {
    //CREATE NEW USER
    
    //Encrypt Password, consider doing off AccessToken
    const password =
      profile.password || bcrypt.hashSync(Date.now() + email,10 );
    delete profile.password; //Clean For Profile Creation
    
    //Create New User
    const newUser = await addUser({ email, password });

    //Assign User Role, Default Student Higher Role, Higer Athority
    const userRole = await rolesModel.addUserRole({
      user_id: newUser.id,
      role_id: 1
    });

    //Create User Profile
    delete profile.email; //Clean For Profile Creation
    const newProfile = await profileModel.createProfile({
      user_id: newUser.id,
      ...profile
    });

     //Clean For Profile Creation
    // Assign Default Missions
    const defaultMissions = await db("default_missions")
      .select(["mission_id"])
      .then(res => {
        res.forEach((mission,i) => {
          const { mission_id } = mission;
          res[i] = ({ mission_id, user_id: newUser.id })
        });        
        return userMissionsModel.add(res);
      });
    //Get User Missions
    const user_missions = await userMissionsModel.findAll(newUser.id);
    
    return {
      user_profile: { ...newProfile },
      ...user_missions,
      newUser: "Welcome New User",
    };
  }
}

function addUser(obj) {
  return db(table)
    .insert(obj, "id")
    .then(([id]) => findById(id));
}

function removeUser(id) {
  return db(table)
    .where({ id })
    .del();
}
