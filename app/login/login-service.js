(function () {
    angular.module('notely.login.service', [])
      .service('login', loginService);

    loginService['$inject'] = ['$http', '$filter', '$state', 'constants', 'authToken', 'currentUser'];
    function loginService($http, $filter, $state, constants, authToken, currentUser) {
        this.login = function (user) {
            return $http.post(constants.apiBasePath + 'session', {
                user: {
                    username: user.username,
                    password: user.password
                }
            })
            .success(function (response) {
                authToken.set(response.auth_token);
                currentUser.set(response.user);
            });
        }

        this.logout = function () {
            authToken.clear();
            currentUser.clear();
        }
    }
})();