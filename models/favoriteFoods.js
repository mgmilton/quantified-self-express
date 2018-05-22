const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

class FavoriteFoods {
  static all() {
    return database('favoritefoods').select('*')
  }
}
