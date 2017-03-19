(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('AuthService', AuthService);

    AuthService.$inject = ['$http', '$localStorage', '$q', '$window', 'config'];

    /* @ngInject */
    function AuthService($http, $localStorage, $q, $window, config) {

        var userData = {};
        var service = {
            // getToken:       getToken,
            // setToken:       setToken,
            // deleteToken:    deleteToken,
            signin:         signin,
            signout:        signout,
            signup:         signup,
            setUserData:    setUserData,
            getUserData:    getUserData
        };
        return service;

        ////////////////

        function getToken() {
          return $localStorage.token;
        };

        function setToken(token) {
          $localStorage.token = token;
        };

        function deleteToken() {
          delete $localStorage.token;
          delete $localStorage.dados;
          $q.when();
        };

        function jwtDecode(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        };

        function setUserData(obj) {
            userData = jwtDecode(obj.token);
            $localStorage.dados = userData;
        };

        function getUserData(){
            userData = $localStorage.dados;
            return userData;
        };

        function signin(data) {
            var deferred = $q.defer();
            $http.post(config.apiUrl+'autenticador/', data).then(function(response) {
                setToken(response.data.token);
                setUserData(response.data);
                deferred.resolve(response.data);
            }, function(errResponse){
              if(errResponse.status == 404){
                deferred.reject(errResponse.data)
              }
            });
            return deferred.promise;
        };

        function signout() {
            return $http.get(config.apiUrl+'autenticador/sair').then(function(response) {
                deleteToken();
                return response.data;
            }, function(errResponse){
                return errResponse;
            });
        };

        function signup(data) {
          return $http.post(config.apiUrl+'cadastro', data)
        };
    }
})();
