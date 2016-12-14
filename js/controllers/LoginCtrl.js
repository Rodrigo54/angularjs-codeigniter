angular
      .module('myApp')
      .controller('LoginCtrl' , LoginCtrl);

LoginCtrl.$inject = ["$scope","$http", "$location", "Usuario"];

function LoginCtrl($scope, $http, $location, Usuario) {
  var self = this;
  self.erro = null;

  self.submit = function(){
    if ($scope.loginForm.$valid) {
      $http.post('api/autenticador/', self.user).then(function(response){
        Usuario.addDados(response.data);
        // console.log(usuario.getDados());
        $location.path('/admin');
      }, function(errResponse){
        self.erro = 'Erro usuario ou senha errados';
        console.log(self.erro);
      });
    }
    else{
      self.erro = 'Erro no Login';
    }
  };

}