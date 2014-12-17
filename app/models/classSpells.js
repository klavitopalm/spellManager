// Load required packages
var mongoose = require('mongoose');

// Define our spell schema
var ClassSpellsSchema = new mongoose.Schema({
  spells: [{type: mongoose.Schema.ObjectId, ref: 'Spell'}],
  name: String
});

// Export the Mongoose model
module.exports = mongoose.model('ClassSpells', ClassSpellsSchema);
