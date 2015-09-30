(function () {
    angular.module('notely.login.service')
    .factory('AuthInterceptor', AuthInterceptor);
    function AuthInterceptor() {
        return {
            request: function (config) {
                if (config.url == "") {

                }
                return config;
            }
            //response: function () {
            //}
        }
    }

    angular.module('notely')
    .config(function ($httpProvider) {
        return $httpProvider.interceptors.push('AuthInterceptor');
    });
})();