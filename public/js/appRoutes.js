angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider',
   function($routeProvider, $locationProvider) {

   $routeProvider

   .when('/spells', {
      templateUrl: 'views/classes.html',
      controller: 'ClassesController',
   })

   .when('/', {
      templateUrl: 'views/spells.html',
      controller: 'SpellsController'
   });

   $locationProvider.html5Mode(true);

}]);
