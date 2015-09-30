(function () {
    angular.module('notely.login.service')
    .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor['inject'] = ['authToken', 'constants'];
    function AuthInterceptor(authToken, constants) {
        return {
            //This messes with the request before sending to the server
            request: function (config) {
                var token = authToken.get();
                if (token && config.url.indexOf(constants.apiBasePath) > -1)
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