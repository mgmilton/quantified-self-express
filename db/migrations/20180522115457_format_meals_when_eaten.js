exports.up = function(knex, Promise) {
  return knex.schema.alterTable('foods', function(table){
    table.specificType('mealsWhenEaten', 'INT[]');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foods')
};
