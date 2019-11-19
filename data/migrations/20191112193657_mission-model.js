exports.up = function(knex) {
  return knex.schema
    .createTable("days_of_the_week", col => {
      col.increments();
      col.string("dayLong").unique();
      col.string("dayShort").unique();
    })
    .createTable("missions", col => {
      col.increments();
      col.string("vertical").notNullable();
      col.string("description").notNullable();
      col.string("question").notNullable();
      col.integer("point_value").notNullable();
      col.specificType("dotw", "INT[]")
      col.dateTime("startDate");
      col.dateTime("endingDate");
      col.integer("dailyOccurances");
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
