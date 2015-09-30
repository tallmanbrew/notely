angular.module('notely')
    .directive('bdFocus', function () {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.ready(function() {
                    elem[0].focus();
                });
            }
        };
    });