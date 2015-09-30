(function () {
    angular.module('notely.login.service', [])
      .service('login', loginService);

    loginService['$inject'] = ['$http', '$filter', '$state', 'constants'];
    function loginService($http, $filter, $state, constants) {
        this.login = function (user) {
            return $http.post(constants.apiBasePath + 'session', {
                user: {
                    username: user.username,
                    password: user.password
                }
            });
        }
    }
})();