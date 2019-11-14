const db = require(_dbConfig);
const questionsModel = require("../questions/questionsModel");

module.exports = {
  findAll,
  findById
  //   remove,
  //   register,
  //   editById,
  //   findByUserName
};

const table = "question_groups";
function findAll() {
  return db(table);
}

function findById(id) {
  id = Array.isArray(id) ? [id] : id;
  return db(table)
    .where({ id })
    .first()
    .then(res => {
        const questions = []
      res.question_ids.map(questionid => {
        questions.push(questionsModel.findById(
          questionid
        ))
        console.log(questions)
      });
      return questions;
      console.log(res.question_ids)
    });
}

// function findByUserName(admin) {
//   if (admin.username) {
//     const username = admin.username;
//     return db(table)
//       .where({ username })
//       .first();
//   }
// }

// function remove(id) {
//   return db(table)
//     .where({ id })
//     .del();
// }
// function editById(id, update) {
//   return db(table)
//     .where({ id })
//     .update(update, '*');
// }
// function register(obj) {
//   return db(table)
//     .insert(obj)
//     .then(([id]) => findById(id));
// }
