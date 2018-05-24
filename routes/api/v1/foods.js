var express = require('express');
var router = express.Router();
var Food = require('../../../models/food');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
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
router.get('/:id/recipes', (req, res) => {
  var id = req.params.id
  Food.find(id)
    .then((food) => {
      if(food.length === 0) {
        res.sendStatus(404)
      } else {
        food = food[0].name
        var url = `http://api.yummly.com/v1/api/recipes?_app-id=1257200a&_app_key=785f0a72ab3daeb8e87aa1e01d0bd49c` + `q=${food.name}`;
        var xhReq = new XMLHttpRequest();
        xhReq.open("GET", url, false);
        xhReq.setRequestHeader('X-Yummly-App-ID', '1257200a');
        xhReq.setRequestHeader('X-Yummly-App-Key', '785f0a72ab3daeb8e87aa1e01d0bd49c');
        xhReq.send(null);
        var recipes = JSON.parse(xhReq.responseText)
        res.json(recipes)
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
