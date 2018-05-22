var express = require('express');
var router = express.Router();
var Food = require('../../../models/food');

router.get('/', (req, res) => {
  Food.all()
    .then((foods) => {
      res.json(foods)
    })
    .catch((error) => res.sendStatus(500).json({error}))
})

router.get('/:id', (req, res) => {
  var id = req.params.id
  Food.find(id)
    .then((food) => {
      if(food.length === 0) {
        res.sendStatus(404)
      } else {
        res.json(food)
      }
    })
})


router.post('/', (req, res) => {
  var attributes = req.body.food
  if (!attributes) {
    return res.status(400).send({error: "No food property provided!"})
  }
  Food.create(attributes)
    .then((food) => {
      res.json(food)
    })
    .catch((error) => res.sendStatus(500).json({error}))
})

router.patch('/:id', (req, res) => {
  var id = req.params.id;
  var attributes = req.body.food;
  Food.update(id, attributes)
    .then((food) => {
      if(food.length === 0){
        res.sendStatus(404)
      } else {
        res.json(food)
      }
    })
    .catch((error) => res.sendStatus(500).json({error}))
})

router.delete('/:id', (req, res)=> {
  var id = req.params.id;
  Food.find(id)
    .then((food) =>{
      if (food.length === 0) {
        res.sendStatus(404)
      } else {
        Food.destroy(id)
          .then((response) => res.sendStatus(204))
      }
    })
    .catch((error) => res.sendStatus(500).json({error}))
})

module.exports = router;
