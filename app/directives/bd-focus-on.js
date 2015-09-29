(function () {
    angular.module('notely')
        .directive('bdFocusOn', function () {
            return {
                link: function (scope, element, attrs) {
                    scope.$on(attrs.bdFocusOn, function (e) {
                        elem[0].focus();
                    });
                }
            };
         });
})();