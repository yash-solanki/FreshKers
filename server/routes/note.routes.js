module.exports = (app) => {
    const notes = require('../controller/note.controller');
    const store = require('');

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

    app.post('/store/addItem', store.addItem);
};
