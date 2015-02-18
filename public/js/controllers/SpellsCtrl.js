angular.module('SpellsCtrl', ['SpellsService', 'SpellsAlphabetLinks', 'SpellsFilterVisibility']).controller('SpellsController', function($scope, $http, Spells, SpellAnchors, VisibleSpells) {


   $scope.allSpellSchools = [
      {name:'Abjuration', isVisible:true},
      {name:'Conjuration', isVisible:true},
      {name:'Divination', isVisible:true},
      {name:'Enchantment', isVisible:true},
      {name:'Evocation', isVisible:true},
      {name:'Illusion', isVisible:true},
      {name:'Necromancy', isVisible:true},
      {name:'Transmutation', isVisible:true}
   ];

   $scope.selectedSpell = '';

   Spells.get(function(data) {
      $scope.selectedSpell = '';
      $scope.allSpells = data;
      updateSpellAnchors($scope.allVisibleSpells)
   });

   $scope.showSpellDetails = function(spell) {
      $scope.selectedSpell = spell;
      $scope.descriptionLinesOfSelectedSpell = spell.description.split(/\r\n|\r|\n/g);
   };

   $scope.isActiveSpell = function(id) {
      var isActive = (id === $scope.selectedSpell._id);
      return isActive;
   };

   $scope.isAnySpellSelected = function() {
      var isAnySpellSelected = ($scope.selectedSpell !== '');
      return isAnySpellSelected;
   };

   $scope.isAnchorAvailable = function(letter) {
      return (letter in $scope.anchors);
   };

   $scope.allVisibleSpells = function(spellSchools) {
      var visibleSpells = VisibleSpells.getSpellsToShow($scope.allSpells, spellSchools);

      updateSpellAnchors(visibleSpells);
      return visibleSpells;
   };

   function updateSpellAnchors(visibleSpells) {
      $scope.anchors = SpellAnchors.getAnchors(visibleSpells);
   };


});
