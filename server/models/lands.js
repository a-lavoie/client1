var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ExSchema = new Schema ({  
  id: Number,
  name: String,
  details: String,
  updated: Date,
  other: String,
  commercialName: String,
  size: Number,
  updatedDescription: Date
});

var Model = function(){
   this.model = mongoose.model('LandsModel', ExSchema, 'landcollection');
}

module.exports = new Model();

