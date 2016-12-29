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
        return {
            request: function(config) {
              config.headers = config.headers || {};

              if ($localStorage.token) {
                config.headers['Authorization'] = 'Bearer ' + $localStorage.token;
              }

              return config;
            },

            responseError: function(response) {
              if (response.status === 401 || response.status === 403) {
                $location.path('/');
              }

              return $q.reject(response);
            }
        }
    }
})();