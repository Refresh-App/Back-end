exports.up = function(knex) {
  return knex.schema.createTable("question_groups", col => {
    col.increments();
    col.text("name", 25);
    col.text("description", 50)
    col.specificType("question_ids", "INT[]").notNullable();
    col.integer('user_id')
    .unsigned()
    .references('id')
    .inTable('users')
    col.timestamp('created_at').defaultTo(knex.fn.now());
    col.dateTime('expires')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("question_groups");
};
