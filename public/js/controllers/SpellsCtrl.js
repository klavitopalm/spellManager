angular.module('SpellsCtrl', []).controller('SpellsController', function($scope, $http) {

   // when landing on the page, get all todos and show them
   $http.get('/api/spells')
   .success(function(data) {
      $scope.mySpells = data;
      console.log(data);
   })
   .error(function(data) {
      console.log('Error: ' + data);
   });


});
