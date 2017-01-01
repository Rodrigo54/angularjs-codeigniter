(function() {
    'use strict';

    angular.module("myApp",  []);

    angular
      .module('myApp', [
        'ui.router',
        'ngMessages',
        'ngAnimate',
        'ngMaterial',
        'ngStorage',
        'ngMaterialSidemenu'
      ]);

    angular
      .module('myApp')
      .config(['$mdThemingProvider', function($mdThemingProvider){
        $mdThemingProvider.theme('default')
          .primaryPalette('indigo',{
            'default': '500'
          })
          .accentPalette('teal',{
            'default': '500'
          })
          .warnPalette('red')
          .backgroundPalette('grey');
    }]);
})();
