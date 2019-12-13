exports.up = function(knex) {
  return knex.schema.createTable("user_missions", col => {
    col.increments();
    col
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");

    col
      .integer("mission_id")
      .unsigned()
      .references("id")
      .inTable("missions")
      .onDelete("CASCADE");
    col.specificType("dotw", "INT[]");
    col.dateTime("start_date");
    col.dateTime("ending_date");
    col.integer("daily_reminders");

    col.unique(["user_id", "mission_id"]);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_missions");
};
