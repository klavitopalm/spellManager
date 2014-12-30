angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
   function($routeProvider, $locationProvider) {

   $routeProvider

   .when('/', {
      templateUrl: 'views/classes.html',
      controller: 'ClassesController',
   })

   .when('/spells', {
      templateUrl: 'views/spells.html',
      controller: 'SpellsController'
   });

   $locationProvider.html5Mode(true);
}]);
