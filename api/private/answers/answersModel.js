const db = require(_dbConfig);
const userMissionsModel = require("../user_missions/userMissionsModel");
module.exports = {
    add,
    editById,
    findAllByUserId,
    findByDateRange,
    findByAnswerId
};

const table = "answers";

function findAllByUserId(id) {
    return db(table).where("user_id", id);
}

function findByAnswerId(user_id, id) {
    return db(table)
        .where({ id })
        .andWhere("user_id", user_id);
}

function findByDateRange(id, startDate, endDate) {
    return db(table)
        .whereBetween("answer_date", [startDate, endDate])
        .orderBy("user_id")
        .where("user_id", id);
}

function add(obj) {
    const user_id = Array.isArray(obj) ? obj[0].user_id : obj.user_id;
    return db(table)
        .insert(obj, "id")
        .then(res => {
            return userMissionsModel.findAll(user_id);
        });
}

function editById(user_id, id, body) {
    return db(table)
        .where({ id })
        .andWhere({ user_id })
        .update(body, "*");
}