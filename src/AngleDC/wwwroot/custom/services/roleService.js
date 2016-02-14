(function () {
    'use strict';

    angular
        .module('custom')
        .factory('roleService', roleService);

    roleService.$inject = ['$http', '$q', 'localStorageService', 'ngAuthSettings'];
    function roleService($http, $q, localStorageService, ngAuthSettings) {
        var serviceBase = ngAuthSettings.apiServiceBaseUri;
        var rolesServiceFactory = {};

        var _getRoles = function () {
            
            var deferred = $q.defer();

            $http.get(serviceBase + 'api/roles', {}).success(function (response) {

                deferred.resolve(response);

            }).error(function (err, status) {
                deferred.reject(err);
            });

            return deferred.promise;
        }

        var _assignRolesToUser = function (id, rolesToAssign) {
            return $http.post(serviceBase + 'api/accounts/create', registration).then(function (response) {
                return response;
            });
        }

        rolesServiceFactory.getRoles = _getRoles;
        rolesServiceFactory.assignRolesToUser = _assignRolesToUser;

        return rolesServiceFactory;
    }

})();
