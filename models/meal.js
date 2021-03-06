const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

const foodsAsJson = () => (
  database.raw(`ARRAY_TO_JSON(
    ARRAY_REMOVE(ARRAY_AGG(foods.*), NULL)
  ) AS foods`)
)


class Meal {
  static all(){
    return database('meals')
    .select(['meals.id', 'meals.name', foodsAsJson()])
    .leftJoin('meal_foods', 'meals.id','meal_foods.meal_id')
    .leftJoin('foods', 'meal_foods.food_id','foods.id')
    .groupBy('meals.id')
    .orderBy('meals.id')
  }

  static find(meal_id) {
    return database('meals')
      .where('meals.id', meal_id)
      .select(['meals.id', 'meals.name', foodsAsJson()])
      .leftJoin('meal_foods', 'meals.id','meal_foods.meal_id')
      .leftJoin('foods', 'meal_foods.food_id','foods.id')
      .groupBy('meals.id')
  }

  static create(meal_id, food_id){
    return database('meal_foods').insert([{meal_id: meal_id, food_id: food_id}])
  }

  static destroy(meal_id, food_id){
    return database('meal_foods')
      .where('meal_foods.meal_id', meal_id)
      .where('meal_foods.food_id', food_id)
      .del()
  }
}

module.exports = Meal
