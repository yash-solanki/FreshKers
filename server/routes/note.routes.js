// const Notes = require('../controller/note.controller');
// class noteCtrl {
//     constructor(app) {
//         console.log("constructor====22>");
//         app.get('/notes', Notes.create);
//     }
// }

module.exports = (app) => {
    const notes = require('../controller/note.controller');

    // Create a new Note
    app.post('/notes',notes.create);

    // Retrieve all Notes
    app.get('/notes', notes.findAll);

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.findOne);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.update);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.delete);
}

// module.export = noteCtrl;
