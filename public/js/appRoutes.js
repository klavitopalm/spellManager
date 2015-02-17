angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
   function($routeProvider, $locationProvider) {

   $routeProvider

   .when('/', {
      templateUrl: 'views/spells.html',
      controller: 'ClassesController',
   })

   .when('/spells', {
      templateUrl: 'views/classes.html',
      controller: 'SpellsController'
   });

   $locationProvider.html5Mode(true);
}]);
