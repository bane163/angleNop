(function() {
    'use strict';

    angular
        .module('custom', [
            // request the the entire framework
            'angle',
            // or just modules
            'app.core',
            'app.sidebar',
            'app.elements',
            'LocalStorageModule',
            'ngPassword',
            'angularUtils.directives.dirPagination',
            'angular-toArrayFilter'
            /*...*/
        ]);    
})();