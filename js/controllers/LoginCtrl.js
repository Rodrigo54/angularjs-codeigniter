(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginCtrl' , LoginCtrl);

    LoginCtrl.$inject = ["$scope","$http", "$location", "Usuario", "AuthService"];

    function LoginCtrl($scope, $http, $location, Usuario, AuthService) {
      var vm = this;
      vm.erro = null;

      vm.submit = function(){
        if ($scope.loginForm.$valid) {
          AuthService.signin(vm.user).then(function(response){
            AuthService.setToken(response.data.token);
            Usuario.addDados(response.data);
            // console.log(usuario.getDados());
            $location.path('admin');
          }, function(errResponse){
            vm.erro = 'Erro usuario ou senha errados';
            console.log(vm.erro);
          });
        }
        else{
          vm.erro = 'Erro no Login';
        }
      };

    }
})();