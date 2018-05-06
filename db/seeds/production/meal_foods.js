
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meal_foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('meal_foods').insert([
        {id: 4, meal_id: 1, food_id: 1},
        {id: 5, meal_id: 1, food_id: 2},
        {id: 6, meal_id: 2, food_id: 3}
      ]);
    });
};
