const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const foodsAsJson = () => (
  database.raw(`ARRAY_TO_JSON(
    ARRAY_REMOVE(ARRAY_AGG(foods.*), NULL)
  ) AS foods`)
)


class FavoriteFoods {
  static all(){
    return database('favoritefoods')
    .select(['favoritefoods.timesEaten', foodsAsJson()])
    .leftJoin('foods_favfoods', 'favoritefoods.id','foods_favfoods.favoritefood_id')
    .leftJoin('foods', 'foods_favfoods.food_id','foods.id')
    .groupBy('favoritefoods.timesEaten')
    .orderBy('favoritefoods.timesEaten')
  }
}

module.exports = FavoriteFoods
