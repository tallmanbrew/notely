(function () {
    angular.module('notely.notes.service', [])
      .service('notes', notesService);

    notesService['$inject'] = ['$http', '$filter', '$state'];
    function notesService($http, $filter, $state) {
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

        this.replaceNote = function (note) {
            notes[
                notes.map(function (e) {
                return e.id;
            })
                .indexOf(note.id)
            ] = note;


            //for (var i = 0; i < notes.length; i++) {
            //    if (notes[i].id == note.id) {
            //        notes[i] = note;
            //    }
            //}
        };

        this.save = function (note) {
            $http.post(neverNoteBasePath + 'notes', {
                api_key: user.apiKey,
                note: note
            })
            .success(function (noteData) {
                notes.unshift(noteData.note);
                $state.go('notes.form', { nodeId: noteData.note.id });
            });
        };

        this.update = function (note) {
            self = this;
            $http.put(neverNoteBasePath + 'notes/' + note.id, {
                api_key: user.apiKey,
                note: note
            })
            .success(function (noteData) {
                note = noteData.note;
                self.replaceNote(note);
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
