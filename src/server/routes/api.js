var express = require('express');
var router = express.Router();
var Pets = require('../models/pets');

//ROUTE 1 - GET ALL PETS
router.get('/pets', function(req, res, next){
  Pets.find(function(err, data){
    if(err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});

//ROUTE 2 GET ONE PET
router.get('/pet/:id', function(req, res, next){
  Pets.findById(req.params.id, function (err, data){
    if(err) {
      res.json({'message': err});
    } else {
      res.json(data);
    }
  });
});




module.exports = router;
