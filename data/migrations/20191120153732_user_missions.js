exports.up = function(knex) {
  return knex.schema.createTable("user_missions", col => {
    col.increments();
    col
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users");
    col
      .integer("mission_id")
      .unsigned()
      .references("id")
      .inTable("missions");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_missions");
};
