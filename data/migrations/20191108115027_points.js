exports.up = function(knex) {
    return knex.schema
      .createTable("points", col => {
        col.increments();
        col
          .integer("user_id")
          .notNullable()
          .references("id")
          .inTable("users")
          .unsigned()
          
        col.integer("points");
        col
          .integer("answer_id")
          .notNullable()
          .references("id")
          .inTable("answers")
     
      });
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists("points")
  };
  