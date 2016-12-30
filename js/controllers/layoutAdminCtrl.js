(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('layoutAdminCtrl', layoutAdminCtrl);

    layoutAdminCtrl.$inject = ['$scope', '$http', '$location', '$mdMedia', 'Usuario', 'AuthService'];

    /* @ngInject */
    function layoutAdminCtrl($scope, $http, $location, $mdMedia, Usuario, AuthService) {
        var vm = this;

        activate();

        vm.openLeftMenu = function() {
            $scope.isSideNavOpen = !$scope.isSideNavOpen;
        };

        vm.sair = function(){
            AuthService.signout().then(function(response){
                AuthService.deleteToken();
                $location.path('/');
            }, function(errResponse){
                console.log(errResponse);
            });
        };

        function activate() {
            // console.log($mdMedia('gt-sm'));
            // $scope.isSideNavOpen = true;
            $scope.isSideNavOpen = $mdMedia('gt-sm');
            $scope.usuario = Usuario.getDados();
        }

    }
})();
