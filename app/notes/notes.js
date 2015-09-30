/**
 * Created by ryan.king on 9/28/2015.
 * Modified by chris.tallman on 9/28/2015
 * nevernote API Key $2a$10$Q8Pks/S.B7hl6S0znRK2iOIVOLR5HB8oRIzBJpwRiRHv.Nb8zkq/m
 */
(function () {
    angular.module('notely.notes', [
        'ui.router',
        'textAngular'
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

    LoginController['inject'] = ['$scope', '$state'];
    function LoginController($scope, $state) {

    }

    NotesController['$inject'] = ['$scope', '$state', 'notes'];
    function NotesController($scope, $state, notes) {
        $scope.notes = notes.all();
    }

    NotesFormController['$inject'] = ['$scope', '$state', 'notes'];
    function NotesFormController($scope, $state, notes) {
        $scope.note = notes.findById($state.params.noteId);

        $scope.deleteNote = function () {
            notes.delete($scope.note).success(function () {
                $state.go('notes.form', { noteId: undefined });
            });
        }

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