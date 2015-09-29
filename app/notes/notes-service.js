(function () {
    angular.module('notely.notes.service', [])
      .service('notes', notes);

    notes['$inject'] = ['$http'];
    function notes($http) {
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
        this.all = function () {
            return notes;
        };

        this.findById = function (noteId) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id == noteId) {
                    return notes[i];
                }
            }
            return {};
        };
    }
})();
