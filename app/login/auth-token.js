(function () {
    angular.module('notely.login.service')
    .service('authToken', AuthToken);
    function AuthToken() {
        var authToken;
        this.set = function (token) {
            authToken = token;
        }
        this.get = function () {
            return authToken;
        }
    }
})();