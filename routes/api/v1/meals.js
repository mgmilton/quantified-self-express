var express = require('express');
var router = express.Router();
var Meal = require('../../../models/meal');


router.get('/', (req, res) => {
  Meal.all()
    .then((meals) => {
      res.json(meals)
    })
    .catch((error) => res.sendStatus(500).json({error}))
})

router.get('/:meal_id/foods', (req, res) => {
  var meal_id = req.params.meal_id;

  Meal.find(meal_id)
    .then((meal) => {
      if(meal.length === 0) {
        res.sendStatus(404)
      } else {
        res.json(meal)
      }
    })
})

router.post('/:meal_id/foods/:food_id', (req, res) => {
  var meal_id = req.params.meal_id;
  var food_id = req.params.food_id;
  Meal.create(meal_id, food_id)
    .then(() => res.status(201).send())
})

router.delete('/:meal_id/foods/:food_id', (req, res) => {
  var meal_id = req.params.meal_id;
  var food_id = req.params.food_id;
  Meal.destroy(meal_id, food_id)
    .then(() => res.status(204).send())
    .catch((error) => res.status(500).json({ error }))
})

module.exports = router;
