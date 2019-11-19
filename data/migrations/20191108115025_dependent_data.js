exports.up = function(knex) {
  return knex.schema
    .createTable("questions", col => {
      col.increments();
      col.string("question", 500);
    })
    .createTable("answers", col => {
      col.increments();
      col.string("answer", 500);
      col.dateTime("answered_at");
      col
      .integer("question")
      .references("id")
      .inTable("questions")
      .onDelete("CASCADE");
      col
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users");
    })
    .createTable("user_answers", col => {
      col.increments();
      col
        .integer("question_id")
        .references("id")
        .inTable("questions")
        .unsigned();
      col
        .integer("answer_id")
        .references("id")
        .inTable("answers")
        .unsigned();
    })

    .createTable("points", col => {
      col.increments();
      col
        .integer("user_id")
        .references("id")
        .inTable("users")
        .unsigned();
      col.integer("points");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("points")
    .dropTableIfExists("user_answers")
    .dropTableIfExists("answers")
    .dropTableIfExists("questions");
};
