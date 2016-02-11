(function () {
    'use strict';

    angular
        .module('custom')
        .factory('authInterceptorService', authInterceptorService);

    authInterceptorService.$inject = ['$q','$injector', '$location', 'localStorageService'];
    function authInterceptorService($q,$injector, $location, localStorageService) {
        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            }

            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                $location.path('/login');
            }
            else if (rejection.status === 400) {

            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }

})();
