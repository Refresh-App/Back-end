const db = require(_dbConfig);

module.exports = {
  findAll,
  findById,
  remove,
  register,
  editById,
  findByUsername
};
const table = "users";

function findAll() {
  return db(table + " as u")
  .select('*')
  .join("profile as p","p.user_id","u.id")
}
function findById(id) {
 
  return db(table)
    .where({ id })
    .first();
}

function findByUsername(username) {
  if (username) {
    return db(table)
      .where({ username })
      .first();
  }
}

function remove(id) {
  return db(table)
    .where({ id })
    .del();
}
function editById(id, update) {
  return db(table)
    .where({ id })
    .update(update, "*");
}
function register(obj) {
  return db(table)
    .insert(obj)
    .then(([id]) => findById(id));
}
