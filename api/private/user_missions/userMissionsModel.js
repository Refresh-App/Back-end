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

 
  
  const missionProgress = await
      db('missions as m').select('mp.*')
      .from( function (){
          this.select(db.raw('array_agg(a.*) as answers'),'m.vertical as mission')
          .from('answers as a')
          .join('missions as m','m.question','a.question_id')
          .whereBetween("answer_date", ['2019-10-18', '2019-12-21'])
          .andWhere('a.user_id',50)
          .as('mp')
          .groupBy('m.vertical')
      })
      
     
      missionProgress.answers = JSON.parse(missionProgress.answers)
     


  return {missionProgress: missionProgress}
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
