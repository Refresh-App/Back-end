const db = require(_dbConfig);
module.exports = {
  findAll,
  findById,
  remove,
  add,
  editById
};
const table = "teams";
async function findAll(id) {
    console.log(id)
  const teamsObj = await db(table + " as t")
    .select("t.*", "p.display_name as team_lead")
    .join("profile as p", "p.user_id", "t.team_lead")
   
    for(let i = 0; i < teamsObj.length;i++){
        teamsObj[i].members = await db('team_subscriptions as ts')
        .select('p.display_name','p.avatar','p.bio')
        .join("profile as p","p.user_id","ts.user_id")
        .where({team_id:teamsObj[i].id})
    }
  return teamsObj;
}

function findTeamMembers(team_id) {
  return db("team_subscriptions")
    .where({ team_id })
    .first();
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
    .then(newTeam => addTeamLead(newTeam));
}
function addTeamLead(newTeam) {
  return db("team_subscriptions")
    .insert(
      {
        team_id: newTeam.id,
        user_id: newTeam.team_lead
      },
      "id"
    )
    .then(res => newTeam);
}
