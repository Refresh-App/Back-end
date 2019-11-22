const db = require(_dbConfig);
module.exports = {
  findAll,
  findById,
  remove,
  add,
  editById
};
const table = "user_missions";
async function findAll(id) {

   const today =  new Date(2019,new Date().getMonth(),new Date().getDate())
   const tomorrow =  new Date(2019,new Date().getMonth(),new Date().getDate() +1)
  const missionProgress = await
      db('missions as m').select('mp.*')
      .from( function (){
          this.select(db.raw('array_agg(a.answer) as totals'),'m.vertical as mission')
          .from('answers as a')
          .join('missions as m','m.question','a.question_id')
          .whereBetween("answer_date", [today, tomorrow])
          .andWhere('a.user_id',2)
          .as('mp')
          .groupBy('m.vertical')
      })
      


  return { missionProgress}
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
  return db(table)
    .where({ id })
    .update(update, "*");
}
function add(obj) {
  return db(table)
    .insert(obj, "id")
    .then(([id]) => findById(id));
}
