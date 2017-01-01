(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('LoginCtrl' , LoginCtrl);

    LoginCtrl.$inject = ["$scope", "$location", "AuthService"];

    function LoginCtrl($scope, $location, AuthService) {
      var vm = this;
      vm.erro = null;

      vm.submit = function(){
        if ($scope.loginForm.$valid) {
            AuthService.signin(vm.user).then(function(dados){
                // console.log(usuario.getDados());
                $location.path('admin');
            },function(erroDados){
                vm.erro = erroDados.message;
            });
        }
        else{
          vm.erro = 'Erro no Login';
        }
      };

    }
})();
