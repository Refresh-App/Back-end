exports.up = function(knex) {
  return knex.schema
    .createTable("days_of_the_week", col => {
      col.increments();
      col.string("dayLong").unique();
      col.string("dayShort").unique();
    })
    .createTable("missions", col => {
      col.increments();
      col.string("missiontitle").notNullable();
      col.string("description").notNullable();
      col.specificType("dotw", "INT[]").notNullable();
      col.dateTime("startDate");
      col.dateTime("endingDate");
      col.integer("dailyOccurances");
    });
};

exports.down = function(knex) {};
