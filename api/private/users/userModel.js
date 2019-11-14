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
  return db(table + " as u ")
  .join("user_roles as ur", "ur.role_id", "u.id")
  .join("roles as rt", "ur.role_id", "ur.id")
  .select("*")
  // .where("u.id", "ur.user_id")
}

function findById(id) {
  id = Array.isArray(id) ? [id] : id;
  return db(table)
    .where({ id })
    .first()
    .then(res => console.log(res))
    .catch(res => console.log(res));
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
