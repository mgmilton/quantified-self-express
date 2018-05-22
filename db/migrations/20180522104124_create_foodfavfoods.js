
exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE foods_favfoods(
    id SERIAL PRIMARY KEY NOT NULL,
    favoritefood_id INTEGER,
    food_id INTEGER
  )`
  return knex.raw(createQuery)
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE food_favfoods`
  return knex.raw(dropQuery)
};
