
exports.up = function(knex, Promise) {
  return knex.schema.createTable('mealfoods', function (t) {
    t.integer('foodId').unsigned().references('foods.id')
    t.integer('mealId').unsigned().references('meals.id')
    t.primary(['foodId', 'mealId'])
    t.timestamps(false, true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('mealfoods')
};
