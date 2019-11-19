const db = require(_dbConfig);
module.exports = {
  findByUserId,
  add,
  findByDateRang
};
const table = "answers";

function findById(id) {
  return db(table)
    .where({ id })
    .first();
}

function findByDateRang(startDate,endDate){
    return db(table)
    .where('answer_date','>=',startDate)
    .where('answer_date','<=',endDate)
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
