angular.module('ClassesCtrl', ['ClassesWithSpellsService', 'ClassesService']).controller('ClassesController', function($http, $scope, ClassesWithSpells, Classes) {


   Classes.get(function(data) {
      $scope.playerClasses = data;
   });

   var activeClassId;

   $scope.showSpells = function(id) {
   ClassesWithSpells.get(id, function (data) {
      $scope.testAccounts = data;
         var temp = data[0];
         $scope.selectedClassSpells = temp.spells;
         $scope.selectedSpell = '';
         activeClassId = id;
      })
   }

   $scope.showSpellDetails = function(spell) {
      $scope.selectedSpell = spell;
   }


   $scope.isActiveClass = function (id) {
      var active = (id === activeClassId);
      return active;
   };

   $scope.isActiveSpell = function (id) {
      var active = (id === $scope.selectedSpell._id);
      return active;
   };

});
