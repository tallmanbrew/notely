/**
 * Created by ryan.king on 9/28/2015.
 */
(function() {
    angular.module('notely.notes', [
        'ui.router'
    ])
        .controller('NotesController', NotesController)
        .config(notesConfig);

    notesConfig['$inject'] = ['$stateProvider'];
    function notesConfig($stateProvider) {
        $stateProvider

            .state('notes', {
                url: '/notes',
                templateUrl: '/notes/notes.html',
                controller: NotesController
            });
    }

    NotesController['$inject'] = ['$scope'];
    function NotesController($scope) {
        $scope.message = 'SHOW UP ON PAGE';
    }
})();