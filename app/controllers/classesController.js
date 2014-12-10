// Load required packages
var ClassSpells = require('../models/classSpells');
var Spell = require('../models/spell.js');
var Mongoose = require('mongoose');

exports.getClassesOnly = function(req, res) {
   ClassSpells.find().sort('_id').exec(function(err, classesOnly) {
      if(err)
         res.send(err);

         res.json(classesOnly);
      });
   };
