exports.seed = function(knex, Promise){
  return knex('favoritefoods'),del()
    .then(function () {
      return knex('favoritefoods').insert([
        {id: 1, timesEaten: 2}
      ])
    })
}
