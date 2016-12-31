(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('AuthInterceptor', AuthInterceptor)
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('AuthInterceptor');
        });


    AuthInterceptor.$inject = ['$location', '$localStorage', '$q'];

    /* @ngInject */
    function AuthInterceptor($location, $localStorage, $q) {
        var service = {
            request: request,
            responseError: responseError
        };

        return service;

        ////////////////

        function request(config) {
          config.headers = config.headers || {};

          if ($localStorage.token) {
            config.headers['Authorization'] = 'Bearer ' + $localStorage.token;
          }

          return config;
        };

        function responseError(response) {
          if (response.status === 401 || response.status === 403) {
            $location.path('/');
          }
          return $q.reject(response);
        };
    }
})();
