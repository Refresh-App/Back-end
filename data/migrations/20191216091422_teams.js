
exports.up = function(knex) {
  knex.schema.createTable('teams', col => {
      col.increments()
      col.string('team_name')
      .notNullable()
      col.integer('team_lead')
      .unsigned()
      .references('id')
      .inTable('users')
      .notNullable()
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('teams')
};
