const db = require(_dbConfig);

module.exports = {
  findAllRolesById,
  findAll,
  findById,
  remove,
  addAdmin,
  editById,
};

const table = 'roles';
const depTable = "user_roles";
function findAllRolesById(userId) {
 return db(depTable + " as ur ")
  .select("rt.id")
  .join("users as u", "u.id", "ur.user_id")
  .join("roles as rt", "rt.id", "ur.role_id")
  .where("ur.user_id", userId)
  
  // .where("rt.id", 3)
}
function findAll(){
  return db(table)
}
function findById(id) {
  id = Array.isArray(id) ? [id] : id;
  return db(table)
    .where({ id })
    .first()
    .then(res => console.log(res))
    .catch(res => console.log(res));
}


function remove(id) {
  return db(table)
    .where({ id })
    .del();
}
function editById(id, update) {
  return db(table)
    .where({ id })
    .update(update, '*');
}
function addAdmin(obj) {
  return db(table)
    .insert(obj)
    .then(([id]) => findById(id));
}

