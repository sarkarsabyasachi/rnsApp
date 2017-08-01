'use strict';

/**
 * @ngdoc overview
 * @name rnsuiApp
 * @description
 * # rnsuiApp
 *
 * Main module of the application.
 */
angular
  .module('rnsuiApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngCsv'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/addconsumer', {
        templateUrl: 'views/addconsumer.html',
        controller: 'AddconsumerCtrl',
        controllerAs: 'addconsumer'
      })
      .when('/profile/:id', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        controllerAs: 'profile'
      })
      .when('/makepayment/:id', {
        templateUrl: 'views/makepayment.html',
        controller: 'MakepaymentCtrl',
        controllerAs: 'makepayment'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope){
    $rootScope.apiUrl="http://localhost:3000/api/";
    $rootScope.headers={};
  });

//   .run(function($http) {
  
//   $http.defaults.headers.common.Authorization = 'login YmVlcDpi' ;
//   //or try this
//   $http.defaults.headers.common['Auth-Token'] = 'login YmVlcDpi';

// });