const db = require(_dbConfig);

module.exports = {
  findAll,
  findById,
  createQuestionGroup
};

const table = "question_groups";
function findAll() {
  return db(table);
}

function findById(id) {
  return db(table)
    .where({ id })
    .first()
    .then(group => findAllQuestionsByArray(group));
}

function findAllQuestionsByArray(arr) {
  return db("questions")
    .whereIn("id", arr.question_ids)
    .then(questions => {
      return { group: arr.group, questions: [...questions] };
    });
}

function createQuestionGroup(obj){
  return db('question_groups')
  .insert(obj,'id')
  .then(([id])=>findById(id))
}
