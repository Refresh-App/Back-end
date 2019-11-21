const db = require(_dbConfig)
module.exports={
    findAll,
    findById,
    remove,
    add,
    editById
}
const table='user_missions'
async function findAll(id){
    const userMissions = await db(table + ' as um')
    .join('missions as m','m.id','um.mission_id')
    .where('um.user_id',1)
    
    const missionProgress = []
     await userMissions.forEach(async mission =>{
         await db('answers as a')
        .select('a.answer')
        .where('a.user_id',2)
        .andWhere('a.question_id',12)
        .then(res =>{
            console.log('sdafsdafsdfsdfsdfsfsfsdaffef',res) 
            missionProgress.push(res)
        })
        .catch(err =>console.log(err))
    })
    
    return {missions:[...userMissions],progress:[...missionProgress]}
    
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
