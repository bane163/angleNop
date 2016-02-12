(function () {
    'use strict';

    angular
        .module('custom')
        .controller('TopNavbarController', TopNavbarController);

    TopNavbarController.$inject = ['$rootScope', '$scope'];
    function TopNavbarController($rootScope, $scope) {
        $scope.updateSearch = function () {
            $rootScope.$broadcast('rootScope:search', $scope.search);
        }
        
    }
})();
