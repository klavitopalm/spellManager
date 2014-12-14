angular.module('ClassesCtrl', []).controller('ClassesController', function($scope, $http) {

   // when landing on the page, get all todos and show them
   $http.get('/api/classes')
   .success(function(data) {
      $scope.myClasses = data;
      console.log(data);
   })
   .error(function(data) {
      console.log('Error: ' + data);
   });



});
