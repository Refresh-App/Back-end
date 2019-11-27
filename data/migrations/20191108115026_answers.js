exports.up = function(knex) {
  return knex.schema.createTable("answers", col => {
    col.increments();
    col.string("answer", 3000);
    col.dateTime("answer_date");
    col
      .integer("question_id")
      .references("id")
      .inTable("questions")
      .unsigned()
    
  
    col
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
   
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("answers");
};
