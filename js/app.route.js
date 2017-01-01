(function() {
    'use strict';

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
                dados: function (EventosService) {
                    return EventosService.getDados();
                }
            },
        });

        $urlRouterProvider.otherwise('/');
    }]);

    angular
      .module('myApp')
      .run(['$location', '$rootScope', function($location, $rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.title = toState.title;
        });
    }]);

})();
