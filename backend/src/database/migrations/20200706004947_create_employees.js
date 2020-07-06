
exports.up = function(knex) {
  return knex.schema.createTable('employees', function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.string('birthday').notNullable();
    table.string('occupation').notNullable();
    table.decimal('salary').notNullable();

    table.string('companie_id').notNullable();
    
    table.foreign('companie_id').references('id').inTable('companies');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('employees');
};
