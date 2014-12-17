// Load required packages
var ClassSpells = require('../models/classSpells');
var Spell = require('../models/spell.js');
var Mongoose = require('mongoose');




exports.postClassSpells = function(req, res) {
  // Create a new instance of the Spell model
  var classSpells = new ClassSpells();

  // Set the spell properties that came from the POST data
  classSpells.name = req.body.name;
  classSpells._id = req.body._id;


  if(req.body.spells) {
    var arr = req.body.spells.slice();
    var objIdArr = [];
    arr.forEach(function(entry) {
      // objIdArr.push(Mongoose.Types.ObjectId(entry));
      classSpells.spells.push(Mongoose.Types.ObjectId(entry));
   });
   //  classSpells.spells = objIdArr;
   //  classSpells.spells = req.body.spells.slice();
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
   ClassSpells.find().populate('spells').sort('name').exec(function(err, classSpells) {
      if (err)
         res.send(err);

         res.json(classSpells);
   });
};



exports.getSingleClassAndSpells = function(req, res) {
   ClassSpells.find({_id: req.params.class_id}).populate('spells').sort('name').exec(function(err, singleClass) {
      if(err)
         res.send(err);

         res.json(singleClass);
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
