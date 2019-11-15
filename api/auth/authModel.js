const db = require(_dbConfig);
const Profile = require("../private/profile/profileModle");
const bcrypt = require("bcrypt");
const rolesModel = require("../public/roles/roles-model")

module.exports = {
  addUser,
  findByEmail,
  findById,
  findOrCreateByEmail
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
  const email = profile.email;
  const user = await db(table)
    .select("email", "id")
    .where({ email })
    .first();

  //If the user exist
  if (user) {
    const  getUserRoles = await rolesModel.findAllRolesById(user.id)
    return { ...profile,user_id:user.id,userRoles:[...getUserRoles], message: "Welcome Back" };
  } else {//CREATE NEW USER
    
    //Encrypt Password, consider doing off AccessToken
    const password = bcrypt.hashSync(Date.now() + email, 14);

    //Create New User
    const newUser = await addUser({email,password})

    //Assign User Role
    const userRole = await rolesModel.addUserRole({user_id: newUser.id, role_id: 2})
    delete profile.email
    
    const newProfile = await Profile.createProfile({
      user_id:newUser.id,
      ...profile,
    })
    
    const getUserRoles = await rolesModel.findAllRolesById(newUser.id)

    delete newProfile.id
    return {...newProfile, userRole:[...getUserRoles], newUser:'Welcome New User'}
  }
}

function addUser(obj) {
  return db(table)
    .insert(obj, "id")
    .then(([id]) => findById(id));
}
