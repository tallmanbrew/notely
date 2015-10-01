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
                template: '<bd-notes-form></bd-notes-form>'
            });
    }
})();