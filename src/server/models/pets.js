var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Pets = new Schema ({
  name: String,
  type: String,
  age: Number
});

module.exports = mongoose.model('pets', Pets);

