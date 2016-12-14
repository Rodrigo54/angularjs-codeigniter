angular
  .module('myApp')
  .service('Usuario', Usuario);

Usuario.$inject = ["$localStorage"];

function Usuario($localStorage){
  var dados = {};

  var addDados = function(obj) {
    dados.id = obj.id;
    dados.nome = obj.nome;
    dados.email = obj.email;
    $localStorage.dados = dados;
  };

  var getDados = function(){
    dados = $localStorage.dados;
    return dados;
  };

  return {
    addDados: addDados,
    getDados: getDados
  };
}