'use strict';

angular.module('eventsApp')
    .factory('monedas_Data', ['$cookieStore', '$rootScope', 'AzureMobileClient','$q', function ($cookieStore, $rootScope, AzureMobileClient, $q) {

        var monedasClient = {};
        var deferred = $q.defer();
        var monedas = {};

        function validarPropiedades(){
            // Validamos que ya cargo los otros datos
            if(
                monedas.hasOwnProperty("monedas_mundo") &&
                monedas.hasOwnProperty("dolar") &&
                monedas.hasOwnProperty("trm") &&
                monedas.hasOwnProperty("acciones")
                )
            {
                deferred.resolve(monedas);
                $rootScope.$apply();
            }
        }

        function TraerDatos(ultimosDatos){

            var trmFiltro = _.filter(ultimosDatos, function(item){ if(item.nombre == 'trm') return item })[0];
            delete trmFiltro.timestamp;
            delete trmFiltro.id;

            AzureMobileClient.getDataFilter("trm",trmFiltro).then(
                function(results) {
                    var trm = new Object();
                    trm.ultimo_valor = _.last(results);
                    monedas.trm = trm;

                    validarPropiedades();
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            var dolarFiltro = _.filter(ultimosDatos, function(item){ if(item.nombre == 'dolar') return item })[0];
            delete dolarFiltro.timestamp;
            delete dolarFiltro.id;

            AzureMobileClient.getDataFilter("dolar",dolarFiltro).then(
                function(results) {
                    var dolar = new Object();
                    dolar.ultimo_valor = _.last(results);
                    monedas.dolar = dolar;

                    validarPropiedades();
                },
                function(error) {
                    deferred.reject(error);
                }
            );

            var monedasFiltro = _.filter(ultimosDatos, function(item){ if(item.nombre == 'monedas_mundo') return item })[0];
            delete monedasFiltro.timestamp;
            delete monedasFiltro.id;
            delete monedasFiltro.nombre;

            AzureMobileClient.getDataFilter("monedas_mundo",monedasFiltro).then(
                function(results) {
                    monedas.monedas_mundo = results;

                    validarPropiedades();
                },
                function(error) {
                    alert(error);
                }
            );

            var accionesFiltro = _.filter(ultimosDatos, function(item){ if(item.nombre == 'acciones') return item })[0];
            delete accionesFiltro.timestamp;
            delete accionesFiltro.id;
            delete accionesFiltro.nombre;

            AzureMobileClient.getDataFilter("acciones",accionesFiltro).then(
                function(results) {
                    monedas.acciones = results;

                    validarPropiedades();
                },
                function(error) {
                    alert(error);
                }
            );
        }


        monedasClient.obtenerMonedas = function () {

            AzureMobileClient.getAllData('ultimos_registros').then(
                function(results){
                    TraerDatos(results);
                },
                function(error){

                }
            );

            return deferred.promise;
        }

        return monedasClient;
    }]);