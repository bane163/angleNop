(function () {
    'use strict';
    //var serviceBase = 'http://localhost/AngularJSAuthentication.API/';
    var serviceBase = 'http://localhost:26264/';
    
    angular
        .module('custom')
        .constant('ngAuthSettings', {
            apiServiceBaseUri: serviceBase,
            clientId: 'ngAuthApp'
        });

})();