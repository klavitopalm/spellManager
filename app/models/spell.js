// Load required packages
var mongoose = require('mongoose');

// Define our spell schema
var SpellSchema = new mongoose.Schema({
  type: String,
  level: Number,
  ritual: Boolean,
  castingTime : {
    value : Number,
    unit : String
  },
  range : {
    value : Number,
    description : String
  },
  components : {
    verbal : Boolean,
    somatic : Boolean,
    material : Boolean,
    materialDescription : String
  },
  duration : {
    amount : String,
    concentration : Boolean
  },
  description : String,
  name: String
});

// Export the Mongoose model
module.exports = mongoose.model('Spell', SpellSchema);
