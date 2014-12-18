angular.module('ClassesWithSpellsService', []).factory('ClassesWithSpells', ['$http', function($http) {

      var ClassesWithSpells = {};
      ClassesWithSpells.get = function(id, callback) {
         $http.get('/api/classspells/'+id)
         .success(function(data) {
            console.log(data);
            callback(data);
         })
         .error(function(data) {
            console.log('Error: ' + data);
         });
      };

      return ClassesWithSpells;
}]);
