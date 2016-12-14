angular
      .module('myApp')
      .controller('HomeCtrl' , HomeCtrl);

HomeCtrl.$inject = ["$scope","$http","Usuario","$location", "dados"];

function HomeCtrl($scope, $http, Usuario, $location, dados) {

  var self = this;
  self.itens = [];
  $scope.usuario = Usuario.getDados();
  if (typeof dados.message !== 'undefined') {
    self.message = dados.message;
  }
  else{
    self.itens = dados;
  }

  self.sair = function(){
    $http.get('api/autenticador/sair', self.user).then(function(response){
      $location.path('/');
    }, function(errResponse){
      console.log(errResponse);
    });
  }

}