var express = require('express');
var router = express.Router();
var favoritefoods = require('../../../models/favoritefoods');

router.get('/', (req, res) => {
  favoritefoods.all()
    .then((favs) => {
      if(favs.length == 0) {
        res.sendStatus(500)
      } else {
        res.json(favs)
      }
    })

})


module.exports = router;
