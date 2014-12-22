angular.module('SpellsService', []).factory('Spells', ['$http', function($http) {

      var Spells = {};
      Spells.get = function(callback) {
         $http.get('/api/spells')
         .success(function(data) {
            console.log(data);
            callback(data);
         })
         .error(function(data) {
            console.log('Error: ' + data);
         });
      };

      return Spells;
}]);
