
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('foods').del()
    .then(function () {
      // Inserts seed entries
      return knex('foods').insert([
        {id: 1, name: 'Bagel', calories: 245},
        {id: 2, name: 'Cashews', calories: 157},
        {id: 3, name: 'Cucumber', calories: 8}
      ]);
    });
};
