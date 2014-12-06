// Load required packages
var Spell = require('../models/spell');

// Create endpoint /api/spells for POST
exports.postSpell = function(req, res) {
  // Create a new instance of the Spell model
  var spell = new Spell();

  // Set the spell properties that came from the POST data
  spell._id = req.body.name;
  spell.type = req.body.type;
  spell.level = req.body.level;
  spell.ritual = req.body.ritual;

  spell.castingTime.value = req.body.castingTimeValue;
  spell.castingTime.unit = req.body.castingTimeUnit;

  spell.range.value = req.body.rangeValue;
  spell.range.description = req.body.rangeDescription;

  spell.components.verbal = req.body.componentsVerbal;
  spell.components.somatic = req.body.componentsSomatic;
  spell.components.material = req.body.componentsMaterial;
  spell.components.materialDescription = req.body.componentsMaterialDescription;

  spell.duration.amount = req.body.durationAmount;
  spell.duration.concentration = req.body.durationConcentration;

  spell.description = req.body.description;

  // Convert the Model instance to a simple object using Model's 'toObject' function
  // to prevent weirdness like infinite looping...
  var upsertData = spell.toObject();

   // Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
   delete upsertData._id;

   // Do the upsert, which works like this: If no Spell document exists with
   // _id = spell.id, then create a new doc using upsertData.
   // Otherwise, update the existing doc with upsertData
   Spell.update({_id: spell.id}, upsertData, {upsert: true}, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'added', data: spell });
    });

};

// Create endpoint /api/spells for GET
exports.getSpells = function(req, res) {
  // Use the Spell model to find all spells
  Spell.find().sort('_id').exec(function(err, spells) {
    if (err)
      res.send(err);

    res.json(spells);
  });
};

// Create endpoint /api/spells/:spell_id for GET
exports.getSpell = function(req, res) {
  // Use the Spell model to find a specific spell
  Spell.find({ _id: req.params.spell_id }, function(err, spell) {
    if (err)
      res.send(err);

    res.json(spell);
  });
};

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
exports.deleteSpell = function(req, res) {
  // Use the Spell model to find a specific spell and remove it
  Spell.remove({_id: req.params.spell_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'removed' });
  });
};
