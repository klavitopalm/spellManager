// Load required packages
var mongoose = require('mongoose');

// Define our spell schema
var ClassSpellsSchema = new mongoose.Schema({
  _id: String,
  spells: [{type: String, ref: 'Spell'}]
});

// Export the Mongoose model
module.exports = mongoose.model('ClassSpells', ClassSpellsSchema);