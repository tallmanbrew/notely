{
    angular.module('notely')
        .directive('bdNotesForm', () => {
            return {
                restrict: 'E',
                replace: true,
                scope: {},
                controller: NotesFormController,
                controllerAs: 'form',
                bindToController: true,
                templateUrl: '/notes/notes-form.html',
            };
    });

    
    class NotesFormController {
        constructor($state, notes){
            this.$state = $state;
            this.notes = notes;

            this.note = this.notes.findById(this.$state.params.noteId);            
        }        

        buttonText() {
            if (this.note.id) {
                return 'Save Changes';
            }
            else {
                return 'Save';
            }
        }

        save() {
            if (this.note.id) {
                this.notes.update(this.note).success(function(data) {
                    this.note = data.note;
                });
            }
            else {
                this.notes.save(this.note);
            }
        };

        deleteNote() {
            this.notes.delete(this.note).success(() => {
                this.$state.go('notes.form', { noteId: undefined });
            });
        }
    }
    NotesFormController['$inject'] = ['$state', 'notes'];
}