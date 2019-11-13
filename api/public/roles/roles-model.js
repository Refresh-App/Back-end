const db = require(_dbConfig);

module.exports = {
  findAll,
  findById,
  remove,
  register,
  editById,
  findByUserName
};

const table = 'roles';
function findAll(){
    return db(`${table} as u `)
    .select('u.id', 'u.email', 'ur.role')
    .join('user_roles as ur','ur.id','u.role_id')
}

function findById(id){
    id =  Array.isArray(id) ? [id]:id
   return db(`${table} as u `)
   .select('u.id', 'u.email', 'ur.role')
   .join('user_roles as ur','ur.id','u.role_id')
   .where('u.id','=',id)
   .first()
}

function findByUserName(admin) {
  if (admin.username) {
    const username = admin.username;
    return db(table)
      .where({ username })
      .first();
  }
}

function remove(id) {
  return db(table)
    .where({ id })
    .del();
}
function editById(id, update) {
  return db(table)
    .where({ id })
    .update(update, '*');
}
function register(obj) {
  return db(table)
    .insert(obj)
    .then(([id]) => findById(id));
}
