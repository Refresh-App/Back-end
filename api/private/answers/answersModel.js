const db = require(_dbConfig);
module.exports = {
  find,
  findAll,
  findByUserId,
  add,
  findByDateRange,
  findAllByQuestionId,
<<<<<<< HEAD
=======
  add
>>>>>>> 31d76e90138d6553c3d06c825baae867be44d36d
};
const table = "answers";

function find(){
  return db(table);
}

function findAll(id) {
    return db(table)
      .where("user_id", id)
      .first();
  }

function findAllByQuestionId(id) {
  return db(table)
    .where({ id })
    .where("user_id", req.user.userId)
    .first();
}

<<<<<<< HEAD
function findByDateRange(id,startDate, endDate) {
  console.log('here')
  return db(table)
    .whereBetween("answer_date", [startDate, endDate])
    .orderBy("user_id")
    .andWhere("user_id",id)
=======
function findByDateRange(startDate, endDate) {
  return db(table)
    .whereBetween("answer_date", [startDate, endDate])
    .orderBy("user_id")
>>>>>>> 31d76e90138d6553c3d06c825baae867be44d36d
}

function findByUserId(id) {
  return db(table)
    .where("user_id", id)
    .orderBy("answer_date");
}

function add(obj) {
  return db(table)
    .insert(obj, "id")
<<<<<<< HEAD
=======
    .then(([id]) => findById(id));
>>>>>>> 31d76e90138d6553c3d06c825baae867be44d36d
}


  
