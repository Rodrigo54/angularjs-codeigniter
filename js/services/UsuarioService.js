(function() {
    'use strict';

    angular
      .module('myApp')
      .service('Usuario', Usuario);

    Usuario.$inject = ["$localStorage", "$window"];

    /* @ngInject */
    function Usuario($localStorage, $window){

        this.addDados = addDados;
        this.getDados = getDados;

        var dados = {};

        ////////////////

        function addDados(obj) {
            var data = jwtDecode(obj.token);
            dados.id = data.id;
            dados.nome = data.nome;
            dados.email = data.email;
            dados.admin = data.admin;
            $localStorage.dados = dados;
        };

        function getDados(){
            dados = $localStorage.dados;
            return dados;
        };

        function jwtDecode(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse($window.atob(base64));
        };
    }
})();
