exports.up = function(knex, Promise) {
  return knex.schema.alterTable('favoritefoods', function(table){
    table.specificType('mealsWhenEaten', 'jsonb[]');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favoritefoods')

};
