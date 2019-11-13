exports.up = function(knex) {
  return knex.schema
    .createTable("roles", col => {
      col.increments();
      col.string("role").unique();
    })
    .createTable("user_roles", col => {
      col.increments();
      col
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      col
        .integer("role_id")
        .unsigned()
        .references("id")
        .inTable("roles");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_roles").dropTableIfExists("roles");
};
