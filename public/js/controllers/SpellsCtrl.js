angular.module('SpellsCtrl', ['SpellsService', 'SpellsAlphabetLinks']).controller('SpellsController', function($scope, $http, Spells, SpellAnchors) {

   $scope.selectedSpell = '';

   Spells.get(function(data) {
      $scope.selectedSpell = '';
      $scope.allSpells = data;

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

   $scope.getAnchors = function() {
      return SpellAnchors.getAnchors('blubb');
   }

});
