const db = require(_dbConfig);
module.exports = {
  findByUserId,
  add,
  findByDateRang,
  findAllByQuestionId
};
const table = "answers";

function findAllByQuestionId(id) {
  return db(table)
    .where({ id })
    .first();
}

function findByDateRang(startDate,endDate){
    return db(table)
    .whereBetween('answer_date', [startDate, endDate])
    .orderBy('question_id')
}

function findByUserId(id) {
  return db(table)
    .where("user_id", id)
    .orderBy("answer_date")
}


function add(obj) {
  return db(table)
    .insert(obj, "id")
    .then(([id]) => findById(id));
}
