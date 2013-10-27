'use strict';

eventsApp.controller('EventListController',
    function EventListController($scope, $location, monedas_Data) {
        $scope.monedas = monedas_Data.obtenerMonedas().then(function(event) {
            $scope.monedas = event;
            $.getScript('/js/custom.js');
        });
    }
);

