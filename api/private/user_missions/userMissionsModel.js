const db = require(_dbConfig)
module.exports={
    findAll,
    findById,
    remove,
    add,
    editById
}
const table='user_missions'
function findAll(){
    return db(table + ' as um')
    .join('missions as m','m.mission_id','um.mission_id')
    .join('users as u','u.id','um.user_id')
}
function findById(id){
    return db(table)
    .where({id})
    .first()
}
function remove(id) {
    return db(table)
    .where({id})
    .del()
}
function editById(id,update){
    return db(table)
    .where({ id })
    .update(update, '*');
}
function add(obj){
    return db(table)
    .insert(obj,'id')
    .then(([id])=>findById(id))
}
