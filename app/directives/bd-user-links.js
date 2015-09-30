angular.module('notely')
    .directive('bdUserLinks', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {},
            controller: userLinksController,
            controllerAs: 'ctrl',
            template: '<div class="user-links">' +
                      '<div ng-show="ctrl.user().id">' +
                      'Signed in as {{ ctrl.user().name }}' +
                      '|' +
                      '<a ng-click="ctrl.logout()">Logout</a>' +
                      '</div>' +
                      '</div>',
        };

        userLinksController['inject'] = ['$state', 'login', 'currentUser'];
        function userLinksController($state, login, currentUser) {
            
            this.user = function () {
                var user = currentUser.get();
                return user;
            };
            this.logout = function () {
                login.logout();
                $state.go('login');
            };
        }
    });