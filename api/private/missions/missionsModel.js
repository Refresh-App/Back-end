const db = require(_dbConfig);
module.exports = {
  findAll,
  findById,
  remove,
  add,
  editById
};
const table = "missions";
function findAll() {
  return db(table + " as m")
    .select('m.*','m.id as mission_id','i.*','q.*', 'q.id as question_id','ic.*')
    .join("questions as q", "q.id", "m.question")
    .join("icons as ic", "ic.id", "m.icon")
    .join("input_type as i", "i.id", "m.input_type").then(res=>{
      console.log(res)
      res.forEach(mission => {
        delete mission.id 
        delete mission.creation_date
      })
      return res
    })
}
function findById(id) {
  return db(table)
    .where({ id })
    .first();
}
function remove(id) {
  return db(table)
    .where({ id })
    .del();
}
function editById(id, update) {
  console.log(id)
  return db(table)
    .where({ id })
    .update(update, "*")
}
function add(obj) {
  return db(table)
    .insert(obj, "id")
    .then(([id]) => findById(id));
}
