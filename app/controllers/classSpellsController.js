// Load required packages
var ClassSpells = require('../models/classSpells');
var Spell = require('../models/spell.js');
var Mongoose = require('mongoose');




exports.postClassSpells = function(req, res) {
  // Create a new instance of the Spell model
  var classSpells = new ClassSpells();

  // Set the spell properties that came from the POST data
  classSpells._id = req.body.name;


  if(req.body.spells) {
    var arr = req.body.spells.slice();
    classSpells.spells = req.body.spells.slice();
  }



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

exports.deleteClass = function(req, res) {
  // Use the ClassSpell model to find a specific class and remove it
  ClassSpells.remove({_id: req.params.class_id }, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'removed' });
  });
};
