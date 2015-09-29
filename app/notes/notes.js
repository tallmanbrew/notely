/**
 * Created by ryan.king on 9/28/2015.
 * Modified by chris.tallman on 9/28/2015
 * nevernote API Key $2a$10$Q8Pks/S.B7hl6S0znRK2iOIVOLR5HB8oRIzBJpwRiRHv.Nb8zkq/m
 */
(function () {
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
                abastract: true,
                resolve: {
                    notePromise: function(notes){
                        return notes.fetchNotes();
                    }
                },
                templateUrl: '/notes/notes.html',
                controller: NotesController
            })

            .state('notes.form', {
                url: '/{noteId}',
                templateUrl: '/notes/notes-form.html',
                controller: NotesFormController
            });
    }

    NotesController['$inject'] = ['$scope', '$state', 'notes'];
    function NotesController($scope, $state, notes) {
        $scope.notes = notes.all();
        //notes.fetchNotes().success(function (notesJson) {
        //    $scope.notes = notesJson;
        //});
        //Dont need if you have abstract: true in the state.
        //$state.go('notes.form')
    }

    NotesFormController['$inject'] = ['$scope', '$state', 'notes'];
    function NotesFormController($scope, $state, notes) {
        //console.log($state.params.noteId);
        $scope.note = notes.findById($state.params.noteId);
        $scope.buttonText = function () {
            if ($scope.note.id) {
                return 'Save Changes';
            }
            else {
                return 'Save';
            }
        }
        $scope.save = function () {
            if ($scope.note.id) {
                notes.update($scope.note).success(function (data) {
                    $scope.note = data.note;
                });
            }
            else {
                notes.save($scope.note);
            }

        };


    }
})();