angular.module('notely')
    .directive('bdNotesList', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {},
            controller: notesListController,
            controllerAs: 'ctrl',
            templateUrl: '/notes/notesListTemplate.html',
        };

        notesListController['inject'] = ['notes'];
        function notesListController(notes) {
            this.notes = notes.all();
        };
    });