(function () {
    'use strict';

    angular
        .module('custom')
        .controller('RegisterFormController', RegisterFormController);

    RegisterFormController.$inject = ['$log', '$scope', '$location', '$timeout', 'authService'];
    function RegisterFormController($log,$scope, $location, $timeout, authService) {
        // for controllerAs syntax
        var vm = this;

        activate();

        ////////////////

        function activate() {
            $log.log('I\'m a line from custom.js');

            vm.savedSuccessfully = false;
            vm.message = "";

            vm.account = {
                userName: "",
                email: "",
                password: "",
                confirmPassword: "",
                agreed: ""
            };

            vm.register = function () {

                vm.account.password = vm.register.password;
                vm.account.confirmPassword = vm.register.account_password_confirm;
                vm.account.userName = vm.account.email;

                authService.saveRegistration(vm.account).then(function (response) {

                    vm.savedSuccessfully = true;
                    vm.message = "User has been registered successfully, you will be redicted to login page in 2 seconds.";
                    startTimer();

                },
                 function (response) {
                     var errors = [];
                     for (var key in response.data.modelState) {
                         for (var i = 0; i < response.data.modelState[key].length; i++) {
                             errors.push(response.data.modelState[key][i]);
                         }
                     }
                     vm.authMsg = "Failed to register user due to:" + errors.join(' ');
                 });
            };

            var startTimer = function () {
                var timer = $timeout(function () {
                    $timeout.cancel(timer);
                    $location.path('/login');
                }, 2000);
            }
        }
    }
})();
