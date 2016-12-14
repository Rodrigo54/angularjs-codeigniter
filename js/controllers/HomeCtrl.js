(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('HomeCtrl' , HomeCtrl);

    HomeCtrl.$inject = ["$scope","$http","Usuario","$location", "dados"];

    function HomeCtrl($scope, $http, Usuario, $location, dados) {

      var vm = this;
      vm.itens = {};
      $scope.usuario = Usuario.getDados();
      if (typeof dados.message !== 'undefined') {
        vm.message = dados.message;
      }
      else{
        vm.itens = dados;
      }

      vm.sair = function(){
        $http.get('api/autenticador/sair', vm.user).then(function(response){
          $location.path('/');
        }, function(errResponse){
          console.log(errResponse);
        });
      }

    }
})();