// Load required packages
var ClassSpells = require('../models/classSpells');




exports.postClassSpells = function(req, res) {
  // Create a new instance of the Spell model
  var classSpells = new ClassSpells();

  // Set the spell properties that came from the POST data
  classSpells._id = req.body.name;
  classSpells.spells = req.body.spells;


  // Convert the Model instance to a simple object using Model's 'toObject' function
  // to prevent weirdness like infinite looping...
  var upsertData = classSpells.toObject();

  // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
  delete upsertData._id;

  // Do the upsert, which works like this: If no Spell document exists with
  // _id = spell.id, then create a new doc using upsertData.
  // Otherwise, update the existing doc with upsertData
  ClassSpells.update({_id: classSpells.id}, upsertData, {upsert: true}, function(err) {
     if (err)
        res.send(err);

        res.json({ message: 'submitted', data: classSpells });
     });
};

exports.getClassAndSpells = function(req, res) {
   //Use the Spell model to find all spells
   ClassSpells.find().populate('spells').sort('_id').exec(function(err, classSpells) {
      if (err)
         res.send(err);

         res.json(classSpells);
   });
};




// Create endpoint /api/spells/:spell_id for GET
// exports.getClassSpells = function(req, res) {
//   // Use the Spell model to find a specific spell
//   ClassSpells.find({ _id: req.params.classSpells_id }, function(err, classSpells) {
//     if (err)
//       res.send(err);
//
//     res.json(classSpells);
//   });
// };

// // Create endpoint /api/spells/:spell_id for PUT
// exports.putSpell = function(req, res) {
//   // Use the Spell model to find a specific spell
//   Spell.update({ _id: req.params.spell_id }, { description: req.body.description }, function(err, num, raw) {
//     if (err)
//       res.send(err);
//
//     res.json({ message: num + ' updated' });
//   });
// };

// Create endpoint /api/spells/:spell_id for DELETE
// exports.deleteSpell = function(req, res) {
//   // Use the Spell model to find a specific spell and remove it
//   ClassSpells.remove({_id: req.params.spell_id }, function(err) {
//     if (err)
//       res.send(err);
//
//     res.json({ message: 'removed' });
//   });
// };
