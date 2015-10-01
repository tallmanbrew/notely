
angular.module('notely')
    .directive('bdUserLinks', () => {
        return {
            restrict: 'E',
            replace: true,
            scope: {},
            controller: UserLinksController,
            controllerAs: 'ctrl',
            bindToController: true,
            template: `
                <div class="user-links">
                        <div ng-show="ctrl.user().id">
                            Signed in as {{ ctrl.user().name }}
                            |
                            <a ng-click="ctrl.logout()">Logout</a>
                        </div>
                      </div>`,
        };
    });

class UserLinksController {
    constructor($state, login, currentUser) {
        this.$state = $state;
        this.login = login;
        this.currentUser = currentUser;
    }
    user() {
        return this.currentUser.get();
    };
    logout() {
        this.login.logout();
        this.$state.go('login');
    };
}
UserLinksController['inject'] = ['$state', 'login', 'currentUser'];