(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('layoutAdminCtrl', layoutAdminCtrl);

    layoutAdminCtrl.$inject = ['$scope', '$http', '$location', '$mdMedia', 'Usuario'];

    /* @ngInject */
    function layoutAdminCtrl($scope, $http, $location, $mdMedia, Usuario) {
        var vm = this;
        vm.title = 'Controller';

        activate();

        vm.openLeftMenu = function() {
            $scope.isSideNavOpen = !$scope.isSideNavOpen;
        };

        vm.sair = function(){
            $http.get('api/autenticador/sair', vm.user).then(function(response){
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
