(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('layoutAdminCtrl', layoutAdminCtrl);

    layoutAdminCtrl.$inject = ['$scope', '$http', '$location', 'Usuario'];

    /* @ngInject */
    function layoutAdminCtrl($scope, $http, $location, Usuario) {
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
            $scope.isSideNavOpen = true;
            $scope.usuario = Usuario.getDados();
        }
    }
})();