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

//ROUTE 3 POST
router.post('/pet', function(req, res, next){
  newPet = new Pets ({
    name: req.body.name,
    type: req.body.type,
    age: req.body.age
  });
  newPet.save(function(err, data){
    if(err) {
      res.json({'message': err});
    } else {
      res.json({'SUCCESS': data});
    }
  });
});

//ROUTE 4 PUT
router.put('/pet/:id', function(req, res, next){
  var update = {
    name: req.body.name,
    type: req.body.type,
    age: req.body.age
  };
  var options = {new: true};
  Pets.findByIdAndUpdate(req.params.id, update, options, function(err, data){
    if(err) {
      res.json({'message': err});
    } else {
      res.json({'UPDATED' : data});
    }
  });
});

//ROUTE 5 DELETE
router.delete('/pet/:id', function(req, res, next){
  Pets.findByIdAndRemove(req.params.id, function(err, data){
    if(err) {
      res.json({'message': err});
    } else {
      res.json({'REMOVED': data});
    }
  });
});




module.exports = router;
