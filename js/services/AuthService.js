(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$localStorage', '$q'];

    /* @ngInject */
    function AuthService($http, $localStorage, $q) {
        return {
            getToken : function () {
              return $localStorage.token;
            },
            setToken: function (token) {
              $localStorage.token = token;
            },
            signin : function (data) {
              return $http.post('api/autenticador/', data)
            },
            signout : function () {
              delete $localStorage.token;
              delete $localStorage.dados;
              $q.when();
              return $http.get('api/autenticador/sair')
            },
            signup : function (data) {
              return $http.post('api/cadastro', data)
            }
        }
    }
})();