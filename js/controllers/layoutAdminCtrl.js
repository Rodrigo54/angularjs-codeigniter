(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('layoutAdminCtrl', layoutAdminCtrl);

    layoutAdminCtrl.$inject = ['$scope', '$location', '$mdMedia', 'AuthService'];

    /* @ngInject */
    function layoutAdminCtrl($scope, $location, $mdMedia, AuthService) {
        var vm = this;

        activate();

        vm.openLeftMenu = function() {
            $scope.isSideNavOpen = !$scope.isSideNavOpen;
        };

        vm.sair = function(){
            AuthService.signout().then(function(response){
                $location.path('/');
            }, function(errResponse){
                console.log(errResponse);
            });
        };

        function activate() {
            // console.log($mdMedia('gt-sm'));
            // $scope.isSideNavOpen = true;
            $scope.isSideNavOpen = $mdMedia('gt-sm');
            $scope.usuario = AuthService.getUserData();
        }

    }
})();
