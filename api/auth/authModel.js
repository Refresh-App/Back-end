const db = require(_dbConfig);
module.exports = {
  addUser,
  findByName,
  findById,
  findByEmail
};

//Nice to declare Tables up top Yo, including sub tables
const table = "users";

function findById(id) {
  return db(table + " as u")
    .select("u.id", "u.username", "r.role")
    .join("roles as r", "r.id", "u.role_id")
    .where("u.id", "=", id)
    .first();
}

function findByName(username) {
  return db(table + " as u")
    .select("u.id", "u.username", "u.password", "r.role")
    .join("roles as r", "r.id", "u.role_id")
    .where({ username })
    .first();
}

function addUser(obj) {
  return db(table)
    .insert(obj)
    .then(([id]) => findById(id));
}
