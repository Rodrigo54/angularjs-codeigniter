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
      .config(config);

    config.$inject = ['$mdThemingProvider'];

    function config($mdThemingProvider){
        $mdThemingProvider.theme('default')
          .primaryPalette('indigo',{
            'default': '500'
          })
          .accentPalette('teal',{
            'default': '500'
          })
          .warnPalette('red')
          .backgroundPalette('grey');
    };

    angular
    .module('myApp')
    .constant('config', {
      // apiUrl: 'https://rodrigoalves.me/api/',
      apiUrl: window.location.host == 'angularjs' ? 'http://angularjs/api/' : 'https://rodrigoalves.me/api/',
      baseUrl: '/',
      enableDebug: true
    });
})();
