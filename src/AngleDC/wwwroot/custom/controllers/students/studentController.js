(function () {
    'use strict';

    angular
        .module('app.elements')
        .controller('StudentController', StudentController)
        .directive('imageloaded', imageloaded);

    StudentController.$inject = ['$scope', '$http','RouteHelpers'];
    function StudentController($scope, $http, RouteHelpers) {
        // for controllerAs syntax
        var vm = this;

        activate();

        ////////////////

        function activate() {
            vm.basepath = RouteHelpers.basepath;
            vm.masonryItems = [{
                "img": "app/img/bg1.jpg",
                "author": "Erica Castro",
                "title": "Trip down the river",
                "body": "Aenean in sollicitudin velit. Nam sem magna, tristique non facilisis a, porta ut elit. Aliquam luctus nulla in justo euismod blandit. Aliquam condimentum enim a risus cursus blandit.",
                "date": "May 03, 2015",
                "comment_count": "56"
            }, {
                "img": "app/img/bg1.jpg",
                "author": "Erica Castro",
                "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "body": "Aenean in sollicitudin velit. Nam sem magna, tristique non facilisis a, porta ut elit. Aliquam luctus nulla in justo euismod blandit. Aliquam condimentum enim a risus cursus blandit.",
                "date": "May 03, 2015",
                "comment_count": "56"
            }, {
                "img": "app/img/bg10.jpg",
                "author": "Erica Castro",
                "title": "Trip down the river",
                "body": "Nullam posuere euismod volutpat. Quisque in ligula eget libero tristique varius sed euismod dolor. Sed ultrices, diam varius pellentesque porta, nulla neque auctor elit, quis tempus orci massa eget odio. Duis eleifend elementum commodo. Donec volutpat tristique laoreet. Cras vitae turpis enim, eget malesuada erat. Suspendisse quam leo, gravida a ullamcorper a, interdum id odio. Nullam eu lacus in nibh rutrum ornare at eget tellus.",
                "date": "May 03, 2015",
                "comment_count": "56"
            }, {
                "img": "app/img/bg2.jpg",
                "author": "Erica Castro",
                "title": "Reviewing latests phones",
                "body": "Aenean in sollicitudin velit. Nam sem magna, tristique non facilisis a, porta ut elit. Aliquam luctus nulla in justo euismod blandit. Aliquam condimentum enim a risus cursus blandit.",
                "date": "May 03, 2015",
                "comment_count": "56"
            }, {
                "img": "app/img/bg8.jpg",
                "author": "Erica Castro",
                "title": "Workspace showcase",
                "body": "Aenean iaculis diam lectus. Morbi quis purus velit. Maecenas tincidunt tempus sapien id ultrices. Vivamus fermentum libero vel felis aliquet interdum.",
                "date": "May 03, 2015",
                "comment_count": "5600"
            }, {
                "img": "app/img/bg3.jpg",
                "author": "Erica Castro",
                "title": "Incredible panoramic",
                "body": "Aenean in sollicitudin velit. Nam sem magna, tristique non facilisis a, porta ut elit. Aliquam luctus nulla in justo euismod blandit. Aliquam condimentum enim a risus cursus blandit.",
                "date": "May 03, 2015",
                "comment_count": "56"
            }];
            
        }
        
    }
    function imageloaded() {
        // Copyright(c) 2013 André König <akoenig@posteo.de>
        // MIT Licensed
        var directive = {
            link: link,
            restrict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            var cssClass = attrs.loadedclass;

            element.bind('load', function () {
                angular.element(element).addClass(cssClass);
            });
        }
    }

})();
