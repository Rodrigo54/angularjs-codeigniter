(function() {
    'use strict';

    angular.module("myApp",  []);

    angular
      .module('myApp', [
        'ngMaterial',
        'ngRoute',
        'ngMessages',
        'ngStorage'
      ]);

    angular
      .module('myApp')
      .config(['$locationProvider','$routeProvider', function($locationProvider, $routeProvider){
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $routeProvider.when('/', {
          templateUrl: '/view/Login.html',
          controller: 'LoginCtrl',
          controllerAs: 'vm',
          title: 'Home Page'
        })
        .when('/admin', {
          templateUrl: '/view/Home.html',
          controller: 'HomeCtrl',
          controllerAs: 'vm',
          title: 'Dashboard',
          resolve:{
            dados: function ($q, $http, $location) {
              var deferred = $q.defer();
              $http.get('api/eventos/').then(function(response) {
                deferred.resolve(response.data);
              }, function(errResponse){
                (errResponse.status == 404) ?
                  deferred.resolve(errResponse.data) :
                  $location.path('/');
              });
              return deferred.promise;
            }
          }
        })
        .otherwise({redirectTo: '/'});
    }]);

    angular
      .module('myApp')
      .config(['$mdThemingProvider', function($mdThemingProvider){
        $mdThemingProvider.theme('default')
          .primaryPalette('indigo',{
            'default': '500'
          })
          .accentPalette('teal',{
            'default': '500'
          })
          .warnPalette('red')
          .backgroundPalette('grey');
    }]);


    angular
      .module('myApp')
      .run(['$location', '$rootScope', function($location, $rootScope) {
        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.title = current.$$route.title;
        });
    }]);
})();