/**
 * Created by Sandeep on 16-Feb-16.
 */


var apiURL="http://130.211.112.59";
'use strict';
var talentScreen=angular.module("talentScreen",[
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.utils',
    'ngRoute',
    'ui.jq',
    'ui.codemirror',
    'satellizer',    
    'ui.bootstrap',
    'ngStorage',
    'ngCookies',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.2fdevs.videogular.plugins.poster',
    'com.2fdevs.videogular.plugins.buffering',
    'ui.bootstrap',
    'scania.angular.select2',
    'ui.select',
    'nvd3','nzTour'
]).run(['$rootScope','$location','$window','$http',function($rootScope, $location, $window,$http) {

    $http({
        method : "GET",
        url : "config.json"
    }).then(function (response) {
        apiURL=response.data.apiUrl;


    });

    /*$authProvider.google({
        clientId: googleId//'67963478686-jqfdc7oohr1ah13ec6pia1r6pr671lt1.apps.googleusercontent.com'
    });*/
    // initialise google analytics
    $window.ga('create', 'UA-80075727-1', 'auto');

    // track pageview on state change
    $rootScope.$on('$stateChangeSuccess', function (event) {
        $window.ga('send', 'pageview', $location.path());
    });
}])







