(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('HomeCtrl' , HomeCtrl);

    HomeCtrl.$inject = ["$scope", "AuthService", "dados"];

    function HomeCtrl($scope, AuthService, dados) {

        var vm = this;
        vm.itens = {};

        activate();

        function activate() {
            $scope.usuario = AuthService.getUserData();
            (typeof dados.message !== 'undefined') ?
            vm.message = dados.message:
            vm.itens = dados;
        }

    }
})();
