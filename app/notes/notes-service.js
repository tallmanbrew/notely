(function () {
    angular.module('notely.notes.service', [])
      .service('notes', notesService);

    notesService['$inject'] = ['$http', '$filter', '$state', 'constants'];
    function notesService($http, $filter, $state, constants) {
        var notes = [];
        //var neverNoteBasePath = 'https://nevernote-1150.herokuapp.com/api/v1/';
        var user = {
            apiKey: '$2a$10$Q8Pks/S.B7hl6S0znRK2iOIVOLR5HB8oRIzBJpwRiRHv.Nb8zkq/m'
        }

        this.fetchNotes = function () {
            return $http.get(constants.apiBasePath + 'notes?api_key=' + user.apiKey)
              .success(function (notesJson) {
                  notes = notesJson;
              });
        };

        this.replaceNote = function (note) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id === note.id) {
                    notes.splice(i, 1);
                    notes.unshift(note);
                    break;
                }
            }
        };

        this.removeNote = function (note) {
            for (var i = 0; i < notes.length; i++) {
                if (notes[i].id === note.id) {
                    notes.splice(i, 1);
                    break;
                }
            }
        }

        this.save = function (note) {
            $http.post(constants.apiBasePath + 'notes', {
                api_key: user.apiKey,
                note: note
            })
            .success(function (noteData) {
                notes.unshift(noteData.note);
                $state.go('notes.form', { noteId: noteData.note.id });
            });
        };

        this.update = function (note) {
            var self = this;
            return $http.put(constants.apiBasePath + 'notes/' + note.id, {
                api_key: user.apiKey,
                note: note
            })
            .success(function (noteData) {
                self.replaceNote(noteData.note);
            });
        };

        this.delete = function (note) {
            var self = this;
            return $http.delete(constants.apiBasePath + 'notes/' + note.id + "?api_key=" + user.apiKey)
            .success(function (deleteData) {
                self.removeNote(note);
            });
        };

        this.all = function () {
            return notes;
        };

        this.findById = function (noteId) {
            var note = ($filter('filter')(notes, {
                id: parseInt(noteId)
            }, true)[0] || {});
            return angular.copy(note);
        };
    }
})();
