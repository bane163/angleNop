(function () {
    'use strict';

    angular
        .module('custom')
        .config(customConfig);

    customConfig.$inject = ['$httpProvider'];
    function customConfig($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');
    }

})();