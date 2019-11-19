exports.up = function(knex) {
  return knex.schema
    .createTable("questions", col => {
      col.increments();
      col.string("question", 500);
      col.dateTime("creation_date");
    })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists("questions");
};
