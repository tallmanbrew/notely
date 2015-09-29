(function () {
    angular.module('notely.notes.service', [])
      .service('notes', notesService);

    notesService['$inject'] = ['$http', '$filter'];
    function notesService($http, $filter) {
        var notes = [];
        var neverNoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/';
        var user = {
            apiKey: '$2a$10$Q8Pks/S.B7hl6S0znRK2iOIVOLR5HB8oRIzBJpwRiRHv.Nb8zkq/m'
        }
        this.fetchNotes = function (callback) {
            $http.get(neverNoteBasePath + 'notes?api_key=' + user.apiKey)
              .success(function (notesJson) {
                  notes = notesJson;
                  if (callback) {
                      callback(notes);
                  }
              });
        };
        this.save = function (note) {
            $http.post(neverNoteBasePath + 'notes', {
                api_key: user.apiKey,
                note: note
            })
            .success(function (noteData) {
                notes.unshift(noteData.note);
            });
        };
        this.all = function () {
            return notes;
        };

        this.findById = function (noteId) {
            return ($filter('filter')(notes, {
                id: parseInt(noteId)
            }, true)[0] || {});

        };
    }
})();
