(function() {
    'use strict';

    angular.module("myApp",  []);

    angular
      .module('myApp', [
        'ui.router',
        'ngMessages',
        'ngAnimate',
        'ngMaterial',
        'ngStorage',
        'ngMaterialSidemenu'
      ]);

    angular
      .module('myApp')
      .config(['$locationProvider','$stateProvider', '$urlRouterProvider', function($locationProvider, $stateProvider, $urlRouterProvider){
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'view/Login.html',
            controller: 'LoginCtrl',
            controllerAs: 'vm',
            title: 'Home Page',
        })
        .state('admin', {
            abstract: true,
            views:{
              '@' : {
                templateUrl: 'view/layout.admin.html',
                controller: 'layoutAdminCtrl',
                controllerAs: 'vm',
              },
              'top@admin' : { templateUrl: 'view/toolbar.admin.html',},
              'left@admin' : { templateUrl: 'view/sidenav.admin.html',},
            },
        })
        .state('home', {
            parent: 'admin',
            url: '/admin',
            title: 'Dashboard',
            templateUrl: 'view/Home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm',
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
            },
        });

        $urlRouterProvider.otherwise('/');
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
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.title = toState.title;
        });
    }]);
})();
