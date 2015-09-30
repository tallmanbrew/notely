(function () {
    angular.module('notely.login.service')
    .service('currentUser', currentUser);

    currentUser['inject'] = ['$window'];
    function currentUser($window) {

        var currentUser = JSON.parse($window.localStorage.getItem('currentUser'));

        this.set = function (user) {
            currentUser = user;
            $window.localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.get = function (){
            return currentUser || {};
        }
        this.clear = function () {
            currentUser = undefined;
            $window.localStorage.removeItem('currentUser');
        }
    }
})();