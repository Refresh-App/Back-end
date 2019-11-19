exports.up = function(knex) {
    return knex.schema
      .createTable("points", col => {
        col.increments();
        col
          .integer("user_id")
          .references("id")
          .inTable("users")
          .unsigned();
        col.integer("points");
        col
        .integer("answer_id")
        .references("id")
        .inTable("answers")
        .onDelete("CASCADE");
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("points")
  };
  