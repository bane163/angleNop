(function() {
    'use strict';

    angular
        .module('app.sidebar')
        .controller('UserBlockController', UserBlockController);

    UserBlockController.$inject = ['$rootScope', '$scope','authService','$state'];
    function UserBlockController($rootScope, $scope, authService, $state) {

        activate();

        ////////////////

        function activate() {
          $rootScope.user = {
            name:     'Freeman Senecharles',
            job:      'ng-developer',
            picture:  'app/img/user/freeman.jpg'
          };

          // Hides/show user avatar on sidebar
          $rootScope.toggleUserBlock = function(){
            $rootScope.$broadcast('toggleUserBlock');
          };

          $rootScope.userBlockVisible = true;

          $scope.signout = function () {
              authService.logOut();
              $state.go('page.login');
          }

          var detach = $rootScope.$on('toggleUserBlock', function(/*event, args*/) {

            $rootScope.userBlockVisible = ! $rootScope.userBlockVisible;

          });

          

          $scope.$on('$destroy', detach);
        }
    }
})();
