var express = require('express');
var authController = require('./controllers/authController');
var spellController = require('./controllers/spellController');
var classSpellsController = require('./controllers/classSpellsController');
var userController = require('./controllers/userController');

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /spells
router.route('/spells')
.post(authController.isAuthenticated, spellController.postSpell)
.get(authController.isAuthenticated, spellController.getSpells);

router.route('/spells/:spell_id')
.get(authController.isAuthenticated, spellController.getSpell)
//.put(authController.isAuthenticated, spellController.putSpell)
.delete(authController.isAuthenticated, spellController.deleteSpell);

// Create endpoint handlers for /users
router.route('/users')
.post(userController.postUsers)
.get(authController.isAuthenticated, userController.getUsers);

// Create endpoint handlers for /classspells
router.route('/classspells')
.post(authController.isAuthenticated, classSpellsController.postClassSpells)
.get(authController.isAuthenticated, classSpellsController.getClassAndSpells);

router.route('/classspells/:class_id')
.delete(authController.isAuthenticated, classSpellsController.deleteClass);

module.exports = router;
