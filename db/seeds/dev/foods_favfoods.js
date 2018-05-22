
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods_favfoods').del()
    .then(function () {
      // Inserts seed entries
      return knex('foods_favfoods').insert([
        {id: 1, favoritefood_id: 1, food_id: 4},
        {id: 2, favoritefood_id: 1, food_id: 5},
      ]);
    });
};
