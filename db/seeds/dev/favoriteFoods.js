
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('favoritefoods').del()
    .then(function () {
      // Inserts seed entries
      return knex('favoritefoods').insert([
        {id: 1, timesEaten: 2}
      ]);
    });
};
