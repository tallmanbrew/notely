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
        .config(notesConfig);

    notesConfig['$inject'] = ['$stateProvider'];
    function notesConfig($stateProvider) {
        $stateProvider
            .state('notes', {
                url: '/notes',
                abastract: true,
                resolve: {
                    notesLoaded: function ($q, $state, $timeout, notes, currentUser) {
                        var deferred = $q.defer();
                        $timeout(function () {
                            if (currentUser.get().id) {
                                notes.fetchNotes()
                                .success(function () {
                                    deferred.resolve();
                                })
                                .error(function () {
                                    deferred.reject();
                                    $state.go('login');
                                })
                            }
                            else {
                                deferred.reject();
                                $state.go('login');
                            }                            
                        });
                        return deferred.promise;
                    }
                },
                templateUrl: '/notes/notes.html'
            })
            .state('notes.form', {
                url: '/{noteId}',
                templateUrl: '/notes/notes-form.html',
                controller: NotesFormController
            });
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