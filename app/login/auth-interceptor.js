(function () {
    angular.module('notely.login.service')
    .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor['inject'] = ['authToken'];
    function AuthInterceptor(authToken) {
        return {
            //This messes with the request before sending to the server
            request: function (config) {
                if (config.url == "") {

                }
                var token = authToken.get();
                if (token)
                {
                    config.headers['Authorization'] = token;
                }
                return config;
            }
            //This is if you want to mess with the response from the server
            //response: function () {
            //}
        }
    }

    angular.module('notely')
    .config(function ($httpProvider) {
        return $httpProvider.interceptors.push('AuthInterceptor');
    });
})();