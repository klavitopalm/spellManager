angular.module('SpellsCtrl', ['SpellsService']).controller('SpellsController', function($scope, $http, Spells) {

   $scope.selectedSpell = '';

   Spells.get(function(data) {
      $scope.selectedSpell = '';
      $scope.allSpells = data;

   });

   $scope.showSpellDetails = function(spell) {
      $scope.selectedSpell = spell;
   };

   $scope.isActiveSpell = function(id) {
      var isActive = (id === $scope.selectedSpell._id);
      return isActive;
   };

   $scope.isAnySpellSelected = function() {
      var isAnySpellSelected = ($scope.selectedSpell !== '');
      return isAnySpellSelected;
   };

});
