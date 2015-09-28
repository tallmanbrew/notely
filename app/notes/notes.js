/**
 * Created by ryan.king on 9/28/2015.
 * Modified by chris.tallman on 9/28/2015
 * nevernote API Key $2a$10$Q8Pks/S.B7hl6S0znRK2iOIVOLR5HB8oRIzBJpwRiRHv.Nb8zkq/m
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
            })

            .state('notes.form', {
              url: '/:noteId',
              templateUrl: '/notes/notes-form.html'
            });
    }

    NotesController['$inject'] = ['$scope', '$state', 'notes'];
    function NotesController($scope, $state, notesService) {
      notesService.fetchNotes(function(notesJson) {
        $scope.notes = notesJson;
      });
        $state.go('notes.form')
    }
})();
