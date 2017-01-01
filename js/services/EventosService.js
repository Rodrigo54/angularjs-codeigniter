(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('EventosService', EventosService);

    EventosService.$inject = ['$q', '$http'];

    /* @ngInject */
    function EventosService($q, $http) {

        var service = {
            getDados: getDados
        };
        return service;

        ////////////////

        function getDados() {
            var deferred = $q.defer();
            $http.get('api/eventos/').then(function(response) {
              deferred.resolve(response.data);
            }, function(errResponse){
              if(errResponse.status == 404){
                deferred.resolve(errResponse.data)
              }
            });
            return deferred.promise;
        }
    }
})();
