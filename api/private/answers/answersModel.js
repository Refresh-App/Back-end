const db = require(_dbConfig);
module.exports = {
  findById,
  findByUserId,
  remove,
  add,
  editById
};
const table = "answers";
function findAll() {
  return db(table);
}
function findById(id) {
  return db(table)
    .where({ id })
    .first();
}

function findByUserId(id) {
  return db(table)
    .where("user_id", id)
    .orderBy("question_id")
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
function add(obj) {
  return db(table)
    .insert(obj, "id")
    .then(([id]) => findById(id));
}
