const db = require(_dbConfig);
module.exports = {
  findAll,
  findById,
  remove,
  add,
  editById
};
const table = "teams";
function findAll() {
  return db(table);
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
    .then(([id]) => findById(id))
    .then(newTeam=>addTeamLead(newTeam))
    
}
function addTeamLead(newTeam) {
  return db("team_subscriptions").insert({
    team_id: newTeam.id,
    user_id: newTeam.team_lead
  },"id").then(res => newTeam)
  
}
