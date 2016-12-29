(function() {
    'use strict';

    angular
      .module('myApp')
      .service('Usuario', Usuario);

    Usuario.$inject = ["$localStorage", "$window"];

    function Usuario($localStorage, $window){
      var dados = {};

      var addDados = function(obj) {
        var data = jwtDecode(obj.token);
        console.log(data);
        dados.id = data.id;
        dados.nome = data.nome;
        dados.email = data.email;
        dados.admin = data.admin;
        $localStorage.dados = dados;
      };

      var getDados = function(){
        dados = $localStorage.dados;
        return dados;
      };

      var jwtDecode = function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
      }

      return {
        addDados: addDados,
        getDados: getDados
      };
    }
})();
