const db = require(_dbConfig);
module.exports = {
  add,
  find,
  findAll,
  findByDateRange,
  findAllByQuestionId
};

const table = "answers";

function find() {
  return db(table);
}

function findAll(id) {
  return db(table).where("user_id", id);
}

function findAllByQuestionId(id) {
  return db(table)
    .where({ id })
    .where("user_id", req.user.userId);
}

function findByDateRange(id, startDate, endDate) {
  return db(table)
    .whereBetween("answer_date", [startDate, endDate])
    .orderBy("user_id")
    .where("user_id", id);
}

function add(obj) {
  return db(table).insert(obj, "id");
}
