
exports.up = function(knex) {
  return knex.schema.createTable('companies', function(table){
    table.string('id').primary();
    table.string('name').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('companies');
};
