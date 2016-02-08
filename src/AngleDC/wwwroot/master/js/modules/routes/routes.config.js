/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/


(function () {
    'use strict';

    angular
        .module('app.routes')
        .config(routesConfig);

    routesConfig.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider'];
    function routesConfig($stateProvider, $locationProvider, $urlRouterProvider, helper) {

        // Set the following to true to enable the HTML5 Mode
        // You may have to set <base> tag in index and a routing configuration in your server
        $locationProvider.html5Mode(false);

        // defaults to dashboard
        $urlRouterProvider.otherwise('/page/login');
        

        // 
        // Application Routes
        // -----------------------------------   
        $stateProvider
           .state('page', {
                url: '/page',
                abstract: true,
                resolve: helper.resolveFor('modernizr', 'icons'),
                templateUrl: helper.basepath('page.html')
            })
          .state('page.login', {
                url: '/login',
                title: 'Login',
                templateUrl: helper.basepath('accountControl/login.html')
            })
          .state('page.register', {
              url: '/register',
              title: 'Register',
              templateUrl: helper.basepath('accountControl/register.html')
          })
          .state('app', {
              url: '/app',
              abstract: true,
              templateUrl: helper.basepath('app.html'),
              resolve: angular.extend(
                 helper.resolveFor('modernizr', 'icons'), {
                     loginRequired: loginRequired
                 }
               )

          })
          .state('app.welcome', {
              url: '/welcome',
              title: 'Welcome',
              templateUrl: helper.basepath('welcome.html')
          })
          .state('app.signup', {
              url: '/signup',
              controller: 'signupController',
              title: 'Signup',
              templateUrl: helper.basepath('signup.html')
          })
          //
          // Material 
          // ----------------------------------- 
          .state('app.cards', {
              url: '/cards',
              title: 'Material Cards',
              templateUrl: helper.basepath('material.cards.html')
          })
          .state('app.forms', {
              url: '/forms',
              title: 'Material Forms',
              templateUrl: helper.basepath('material.forms.html')
          })
          .state('app.whiteframe', {
              url: '/whiteframe',
              title: 'Material Whiteframe',
              templateUrl: helper.basepath('material.whiteframe.html')
          })
          .state('app.matcolors', {
              url: '/matcolors',
              title: 'Material Colors',
              templateUrl: helper.basepath('material.colors.html')
          })
          .state('app.lists', {
              url: '/lists',
              title: 'Material Lists',
              templateUrl: helper.basepath('material.lists.html')
          })
          .state('app.inputs', {
              url: '/inputs',
              title: 'Material Inputs',
              templateUrl: helper.basepath('material.inputs.html')
          })
          .state('app.matwidgets', {
              url: '/matwidgets',
              title: 'Material Widgets',
              templateUrl: helper.basepath('material.widgets.html'),
              resolve: helper.resolveFor('weather-icons', 'loadGoogleMapsJS', function () { return loadGoogleMaps(); }, 'ui.map')
          })
          .state('app.ngmaterial', {
              url: '/ngmaterial',
              title: 'ngMaterial',
              templateUrl: helper.basepath('material.ngmaterial.html')
          })

        function loginRequired($location, $q, $timeout, $state, authService) {
            var deferred = $q.defer();

            if (!authService.authentication.isAuth) {
                deferred.reject()
                var timer = $timeout(function () {
                    $timeout.cancel(timer);
                    $location.path('/login');
                }, 5000);
            } else {
                deferred.resolve();
            }

            return deferred.promise;
        }

        // 
        // CUSTOM RESOLVES
        //   Add your own resolves properties
        //   following this object extend
        //   method
        // ----------------------------------- 
        // .state('app.someroute', {
        //   url: '/some_url',
        //   templateUrl: 'path_to_template.html',
        //   controller: 'someController',
        //   resolve: angular.extend(
        //     helper.resolveFor(), {
        //     // YOUR RESOLVES GO HERE
        //     }
        //   )
        // })
        ;

    } // routesConfig

})();

