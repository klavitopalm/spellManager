angular.module('ClassesService', []).factory('Classes', ['$http', function($http) {

      var Classes = {};
      Classes.get = function(callback) {
         $http.get('/api/classes')
         .success(function(data) {
            console.log(data);
            callback(data);
         })
         .error(function(data) {
            console.log('Error: ' + data);
         });
      };

      return Classes;
}]);
