angular.module('ClassesCtrl', ['ClassesWithSpellsService', 'ClassesService'])
   .controller('ClassesController', function($http, $scope, ClassesWithSpells, Classes) {

   $scope.selectedSpell = '';

   Classes.get(function(data) {
      $scope.playerClasses = data;
      $scope.selectedSpell = '';
   });

   var activeClassId;

   $scope.showSpells = function(id) {
      ClassesWithSpells.get(id, function(data) {
         var spellsLevel0 = [];
         var spellsLevel1 = [];
         var spellsLevel2 = [];
         var spellsLevel3 = [];
         var spellsLevel4 = [];
         var spellsLevel5 = [];
         var spellsLevel6 = [];
         var spellsLevel7 = [];
         var spellsLevel8 = [];
         var spellsLevel9 = [];
         var spellsLevel10 = [];

         var singleClass = data[0];
         angular.forEach(singleClass.spells, function(singleSpell) {


            switch (singleSpell.level) {
               case 0:
                  spellsLevel0.push(singleSpell);
               break;
               case 1:
                  spellsLevel1.push(singleSpell);
               break;
               case 2:
                  spellsLevel2.push(singleSpell);
               break;
               case 3:
                  spellsLevel3.push(singleSpell);
               break;
               case 4:
                  spellsLevel4.push(singleSpell);
               break;
               case 5:
                  spellsLevel5.push(singleSpell);
               break;
               case 6:
                  spellsLevel6.push(singleSpell);
               break;
               case 7:
                  spellsLevel7.push(singleSpell);
               break;
               case 8:
                  spellsLevel8.push(singleSpell);
               break;
               case 9:
                  spellsLevel9.push(singleSpell);
               break;
               case 10:
                  spellsLevel10.push(singleSpell);
               break;
               default:
                  console.log('Error: unsupported spell level -' + singleSpell.level);
            }
         });

         $scope.spellsLevel0 = spellsLevel0;
         $scope.spellsLevel1 = spellsLevel1;
         $scope.spellsLevel2 = spellsLevel2;
         $scope.spellsLevel3 = spellsLevel3;
         $scope.spellsLevel4 = spellsLevel4;
         $scope.spellsLevel5 = spellsLevel5;
         $scope.spellsLevel6 = spellsLevel6;
         $scope.spellsLevel7 = spellsLevel7;
         $scope.spellsLevel8 = spellsLevel8;
         $scope.spellsLevel9 = spellsLevel9;
         $scope.spellsLevel10 = spellsLevel10;

         var temp = data[0];
         $scope.selectedSpell = '';
         activeClassId = id;
      });
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
      var isThereASpellToDisplay = false;

      if($scope.spellsLevel0 && $scope.spellsLevel0.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel1 && $scope.spellsLevel1.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel2 && $scope.spellsLevel2.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel3 && $scope.spellsLevel3.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel4 && $scope.spellsLevel4.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel5 && $scope.spellsLevel5.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel6 && $scope.spellsLevel6.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel7 && $scope.spellsLevel7.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel8 && $scope.spellsLevel8.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel9 && $scope.spellsLevel9.length) {
         isThereASpellToDisplay = true;
      }
      else if($scope.spellsLevel10 && $scope.spellsLevel10.length) {
         isThereASpellToDisplay = true;
      }

      return isThereASpellToDisplay;
   };


});
