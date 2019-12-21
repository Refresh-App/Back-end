exports.up = function(knex) {
  return knex.schema.createTable("missions", col => {
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
    col.string('color')
    col.integer("input_type")
    .references('id')
    .inTable('input_type')
    .notNullable()
    col.integer("icon")
    .references('id')
    .inTable('icons')
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("days_of_the_week")
    .dropTableIfExists("missions");
};
