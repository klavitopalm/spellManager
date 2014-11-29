//run with MONGO_COMPOSE='mongodb://localhost:27017/dnd5Spells' nodemon server.js

// Load required packages
var express = require('express');
var compression = require('compression');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var spellController = require('./controllers/spellController');
var classSpellsController = require('./controllers/classSpellsController');
var userController = require('./controllers/userController');
var passport = require('passport');
var authController = require('./controllers/authController');

// Connect to the beerlocker MongoDB
mongoose.connect(process.env.MONGO_COMPOSE);

//mongoose.connect('mongodb://localhost:27017/dnd5Spells');

// Create our Express application
var app = express();

// Add content compression middleware
app.use(compression());

// Add static middleware
var oneDay = 86400000;
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));


// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Add static middleware
app.use(express.static(__dirname + '/public'));

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



// Register all our routes with /api
app.use('/api', router);

// Start the server
var port = 3000;
app.listen(process.env.PORT || port);
console.log('Spells on port ' + port);
