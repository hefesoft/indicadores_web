'use strict';

var eventsApp = angular.module('eventsApp',['ngCookies'])
    .config(function ($routeProvider, $locationProvider) {       
        $routeProvider.when('/dashboard',
            {
                templateUrl: '/templates/EventList.html',
                controller: 'EventListController'
            });
        $routeProvider.when('/acciones',
            {
                templateUrl: '/templates/Acciones.html',
                controller: 'accionesController'
            });

        $routeProvider.otherwise({redirectTo: '/dashboard'});
        $locationProvider.html5Mode(true);
    });

eventsApp.run(function ($rootScope) {
    $rootScope.azureURL  = 'https://indicadores.azure-mobile.net/';
    $rootScope.azureAppKey   = 'oiXKUUWOqgqBiVrJlHShkWtAgjsCsc35';
});




eventsApp.run(function ($rootScope) {
    $rootScope.azureURL  = 'https://indicadores.azure-mobile.net/';
    $rootScope.azureAppKey   = 'oiXKUUWOqgqBiVrJlHShkWtAgjsCsc35';
});


