(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('HomeCtrl' , HomeCtrl);

    HomeCtrl.$inject = ["$scope", "Usuario", "dados"];

    function HomeCtrl($scope, Usuario, dados) {

        var vm = this;
        vm.itens = {};

        activate();

        function activate() {
            $scope.usuario = Usuario.getDados();
            (typeof dados.message !== 'undefined') ?
            vm.message = dados.message:
            vm.itens = dados;
        }

    }
})();