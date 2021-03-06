const db = require(_dbConfig);
const rolesModel = require('../roles/roles-model')
module.exports = {
    findAll,
    findByUserId,
    findByProfileId,
    removeByUserId,
    createProfile,
    editByUserId
};
const table = "profile";

function findAll() {
    return db(table);
}

function findByUserId(id) {
    return db(table, "user_roles as ur")
        .where("user_id", id)
        .first()
        .then(async profile =>{
             profile.user_roles = await rolesModel.findUserRolesByUserId(id)
             return profile
        })
}

function findByProfileId(id) {
    return db(table)
        .where({ id })
        .first();
}

function removeByUserId(id) {
    return db(table)
        .where({ id })
        .del();
}

function editByUserId(id, update) {
    return db(table)
        .where("user_id", id)
        .update(update, "*");
}

function createProfile(obj) {
    return db(table)
        .insert(obj, "id")
        .then(([id]) => findByProfileId(id));
}