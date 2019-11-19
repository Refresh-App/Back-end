exports.up = function(knex) {
  return knex.schema
    .createTable("days_of_the_week", col => {
      col.increments();
      col.string("day_long").unique();
      col.string("day_short").unique();
    })
    .createTable("missions", col => {
      col.increments();
      col.string("vertical").notNullable();
      col.string("description").notNullable();
      col
        .integer("question")
        .references("id")
        .inTable("questions")
        .onDelete("CASCADE");
      col.integer("point_value").notNullable();
      col.integer("goal").notNullable();
      col.specificType("dotw", "INT[]");
      col.dateTime("start_date");
      col.dateTime("ending_date");
      col.integer("daily_reminders");
      col
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("days_of_the_week")
    .dropTableIfExists("missions");
};
