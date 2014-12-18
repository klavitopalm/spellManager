angular.module('ClassesCtrl', []).controller('ClassesController', function($http, $scope) {

   $http.get('/api/classes')
   .success(function(data) {
      $scope.playerClasses = data;
      console.log(data);
   })
   .error(function(data) {
      console.log('Error: ' + data);
   });

   $scope.showSpells = function(id) {
      $http.get('/api/classspells/'+id)
      .success(function(data) {
         var temp = data[0];
         $scope.selectedClassSpells = temp.spells;
         $scope.selectedSpell = '';
         console.log(data);
      })
      .error(function(data) {
         console.log('Error: ' + data);
      });
   }

   $scope.showSpellDetails = function(spell) {
      $scope.selectedSpell = spell;
   }

});
