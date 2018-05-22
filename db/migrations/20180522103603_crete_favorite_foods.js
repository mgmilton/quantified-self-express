
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favoritefoods', function(table){
    table.increments('id').primary();
    table.integer('timesEaten');
    table.timestamp('created_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favoritefoods')
};
