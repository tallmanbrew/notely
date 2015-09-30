(function() {
  var app = angular.module('notely', [
    'ui.router',
    'notely.login',
    'notely.login.service',
    'notely.notes',
    'notely.notes.service'
  ]);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/notes/');
  }

  config['$inject'] = ['$urlRouterProvider'];
  app.config(config);
})();
