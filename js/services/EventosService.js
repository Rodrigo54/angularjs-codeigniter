(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('EventosService', EventosService);

    EventosService.$inject = ['$q', '$http','config'];

    /* @ngInject */
    function EventosService($q, $http, config) {

        var service = {
            getDados: getDados
        };
        return service;

        ////////////////

        function getDados() {
            var deferred = $q.defer();
            $http.get(config.apiUrl+'eventos/').then(function(response) {
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
