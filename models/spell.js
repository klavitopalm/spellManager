// Load required packages
var mongoose = require('mongoose');

// Define our spell schema
var SpellSchema = new mongoose.Schema({
  name: String,
  type: String,
  level: Number,
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
});

// Export the Mongoose model
module.exports = mongoose.model('Spell', SpellSchema);
