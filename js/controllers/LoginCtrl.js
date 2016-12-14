(function() {
    'use strict';

    angular
          .module('myApp')
          .controller('LoginCtrl' , LoginCtrl);

    LoginCtrl.$inject = ["$scope","$http", "$location", "Usuario"];

    function LoginCtrl($scope, $http, $location, Usuario) {
      var vm = this;
      vm.erro = null;

      vm.submit = function(){
        if ($scope.loginForm.$valid) {
          $http.post('api/autenticador/', vm.user).then(function(response){
            Usuario.addDados(response.data);
            // console.log(usuario.getDados());
            $location.path('/admin');
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