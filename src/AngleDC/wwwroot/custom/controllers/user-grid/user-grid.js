
/**=========================================================
 * Module: demo-buttons.js
 * Provides a simple demo for buttons actions
 =========================================================*/

(function () {
    'use strict';

    angular
        .module('custom')
        .controller('UserGridController', UserGridController);

    UserGridController.$inject = ['$scope', '$filter', '$http', 'editableOptions', 'editableThemes', '$q', '$log', 'authService', 'roleService', 'toaster'];
    function UserGridController($scope, $filter, $http, editableOptions, editableThemes, $q, $log, authService, roleService, toaster) {
        var vm = this;

        activate();

        ////////////////

        function activate() {

            $log.log('I\'m a line from user-grid.js');
            vm.users = {};
            authService.getAllUsers().then(
                function (resp) {
                    vm.users = resp;
                },
                function (err) {

                });

            // editable row
            // ----------------------------------- 
            //vm.users = [
            //  { id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin' },
            //  { id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip' },
            //  { id: 3, name: 'awesome user3', status: 2, group: null }
            //];

            //vm.statuses = [
            //  { value: 1, text: 'status1' },
            //  { value: 2, text: 'status2' },
            //  { value: 3, text: 'status3' },
            //  { value: 4, text: 'status4' }
            //];

            vm.groups = [];
            vm.loadGroups = function () {
                return vm.groups.length ? null : roleService.getRoles().then(function (data) {
                    vm.groups = data;
                },
                function (err) {

                });
            };

            vm.showGroup = function (user) {
                if (user.group && vm.groups.length) {
                    var selected = $filter('filter')(vm.groups, { id: user.group });
                    return selected.length ? selected[0].text : 'Not set';
                } else {
                    return user.groupName || 'Not set';
                }
            };

            vm.showStatus = function (user) {
                var selected = [];
                if (user.status) {
                    selected = $filter('filter')(vm.statuses, { value: user.status });
                }
                return selected.length ? selected[0].text : 'Not set';
            };

            vm.checkName = function (data, id) {
                if (id === 2 && data !== 'awesome') {
                    return 'Username 2 should be `awesome`';
                }
            };

            vm.saveUser = function (data, id) {
                var fullName = data.fullName.split(" ");
                //vm.user not updated yet
                var account = {
                    userName: data.userName,
                    firstName: fullName[0],
                    lastName: fullName[fullName.length - 1],
                    email: data.userName,
                    password: "TempPass#163",
                    confirmPassword: "TempPass#163",
                    agreed: false
                };
                angular.extend(data, { id: id });
                console.log('Saving user: ' + id);
                authService.saveRegistration(account).then(function (response) {
                    var resp = response;                    
                    toaster.pop('success', "success", "User added successfully");
                },
                 function (response) {
                     var errors = [];
                     for (var key in response.data.modelState) {
                         for (var i = 0; i < response.data.modelState[key].length; i++) {
                             errors.push(response.data.modelState[key][i]);
                         }
                     }
                     toaster.pop('error', "Failed", "Failed to register user due to:" + errors.join(' '));
                 });
            };

            // remove user
            vm.removeUser = function (index) {
                vm.users.splice(index, 1);
            };

            // add user
            vm.addUser = function () {
                vm.inserted = {
                    id: vm.users.length + 1,
                    name: '',
                    status: null,
                    group: null,
                    isNew: true
                };
                vm.users.push(vm.inserted);
            };

            // editable column
            // ----------------------------------- 


            vm.saveColumn = function (column) {
                var results = [];
                angular.forEach(vm.users, function (/*user*/) {
                    // results.push($http.post('/saveColumn', {column: column, value: user[column], id: user.id}));
                    console.log('Saving column: ' + column);
                });
                return $q.all(results);
            };

            // editable table
            // ----------------------------------- 

            // filter users to show
            vm.filterUser = function (user) {
                return user.isDeleted !== true;
            };

            // mark user as deleted
            vm.deleteUser = function (id) {
                var filtered = $filter('filter')(vm.users, { id: id });
                if (filtered.length) {
                    filtered[0].isDeleted = true;
                }
            };

            // cancel all changes
            vm.cancel = function () {
                for (var i = vm.users.length; i--;) {
                    var user = vm.users[i];
                    // undelete
                    if (user.isDeleted) {
                        delete user.isDeleted;
                    }
                    // remove new 
                    if (user.isNew) {
                        vm.users.splice(i, 1);
                    }
                }
            };

            // save edits
            vm.saveTable = function () {
                var results = [];
                for (var i = vm.users.length; i--;) {
                    var user = vm.users[i];
                    // actually delete user
                    if (user.isDeleted) {
                        vm.users.splice(i, 1);
                    }
                    // mark as not new 
                    if (user.isNew) {
                        user.isNew = false;
                    }

                    // send on server
                    // results.push($http.post('/saveUser', user));
                    console.log('Saving Table...');
                }

                return $q.all(results);
            };

            $scope.$on('rootScope:search', function (event, data) {
                console.log(data); // 'Broadcast!'
                $scope.search = data;
            });

        }
    }
})();
