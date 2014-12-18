angular.module('ClassesCtrl', []).controller('ClassesController', function($http, $scope) {

   $http.get('/api/classes')
   .success(function(data) {
      $scope.playerClasses = data;
      console.log(data);
   })
   .error(function(data) {
      console.log('Error: ' + data);
   });

   var activeClassId;

   $scope.showSpells = function(id) {
      $http.get('/api/classspells/'+id)
      .success(function(data) {
         var temp = data[0];
         $scope.selectedClassSpells = temp.spells;
         $scope.selectedSpell = '';
         activeClassId = id;
         console.log(data);
      })
      .error(function(data) {
         console.log('Error: ' + data);
      });
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
