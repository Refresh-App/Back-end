exports.up = function(knex) {
  return knex.schema.createTable("users", col => {
    col.increments();
    col
      .string("email", 100)
      .unique()
      .notNullable();
    col.string("password", 128).notNullable();
    col.string("avatar", 500);
    col.string("display_name", 30)
    col.string("bio", 1000);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
