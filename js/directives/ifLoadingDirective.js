(function() {

    angular
    .module('myApp')
    .directive('ifLoading', ifLoading);

    ifLoading.$injector = ['$http'];

    function ifLoading($http){

        var directive = {
            restrict: 'A',
            templateUrl: 'view/spinnerDirective.html',
            link: link
        };
        return directive;

        function link(scope, element, attrs) {
            scope.isLoading = isLoading;

            scope.$watch(scope.isLoading, toggleElement);

            ////////

            function toggleElement(loading) {

              if (loading) {
                element[0].style.display = "block";
              } else {
                element[0].style.display = "none";
              }
            }

            function isLoading() {
              return $http.pendingRequests.length > 0;
            }
        }

    };

})();
