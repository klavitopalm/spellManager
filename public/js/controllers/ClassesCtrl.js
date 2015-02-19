angular.module('ClassesCtrl', ['ClassesWithSpellsService', 'ClassesService'])
   .controller('ClassesController', function($http, $scope, ClassesWithSpells, Classes) {


   var SPELLS_LENGTH = 11;

   $scope.selectedSpell = '';

   Classes.get(function(data) {
      $scope.playerClasses = data;
      $scope.selectedSpell = '';
   });

   var activeClassId;

   $scope.showSpells = function(id) {
      ClassesWithSpells.get(id, function(data) {

         var spellsLevel = Create2DArray(SPELLS_LENGTH);

         var singleClass = data[0];

         for(var i = 0, len = singleClass.spells.length; i<len; i++) {
            if(singleClass.spells[i].level < 0 || singleClass.spells[i].level >= SPELLS_LENGTH ) {
               console.log('Error: unsupported spell level -' + singleClass.spells[i].level);
            }
            else {
               spellsLevel[singleClass.spells[i].level].push(singleClass.spells[i]);
            }
         }

         $scope.spellsLevel = new Array(SPELLS_LENGTH);

         for(var i = 0; i<SPELLS_LENGTH; i++) {
            $scope.spellsLevel[i] = spellsLevel[i];
         }

         var temp = data[0];
         $scope.selectedSpell = '';
         activeClassId = id;
      });
   }

   function Create2DArray(rows) {
      var arr = [];

      for (var i=0;i<rows;i++) {
         arr[i] = [];
      }

      return arr;
   }

   $scope.showSpellDetails = function(spell) {
      $scope.selectedSpell = spell;
      $scope.descriptionLinesOfSelectedSpell = spell.description.split(/\r\n|\r|\n/g);
   };

   $scope.isActiveClass = function(id) {
      var isActive = (id === activeClassId);
      return isActive;
   };

   $scope.isActiveSpell = function(id) {
      var isActive = (id === $scope.selectedSpell._id);
      return isActive;
   };

   $scope.isAnySpellSelected = function() {
      var isAnySpellSelected = ($scope.selectedSpell !== '');
      return isAnySpellSelected;
   };

   $scope.isThereASpellToDisplay = function() {
      if($scope.spellsLevel) {
         for(var i = 0; i<SPELLS_LENGTH; i++) {
            if($scope.spellsLevel[i] && $scope.spellsLevel[i].length) {
               return true;
            }
         }

      }
      return false;
   };


});
