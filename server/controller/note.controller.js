const Note = require('../models/note.model.js');

exports.create = async (req, res) => {
    if(!req.body.content) {
        throw new Error('Note content can not be empty');
    }
    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    });
    const data = await note.save();
    if (!data) {
        throw new Error('Some error occurred while creating the Note.');
    }
    return res.send(data);
};

exports.findAll = async (req, res) => {
    const notes = await Note.find().lean();
    if (!notes) {
        throw new Error('Some error occurred while retrieving notes.');
    }
    return res.status(500).send(notes);
};

exports.findOne = async (req, res) => {
    const note = await Note.findById(req.params.noteId).lean();
    if (!note) {
        throw new Error(`Note not found with id ${req.params.noteId}`);
    }
    return res.send(note);
};

exports.update = async (req, res) => {
    if(!req.body.content) {
        throw new Error('Note content can not be empty');
    }
    const postObj = {
      title: req.body.title || 'Untitled Note',
      content: req.body.content
    };
    const note = await Note.findByIdAndUpdate(req.params.noteId, postObj, { new: true }).lean();
    if (!note) {
        throw new Error(`Note not found with id  ${req.params.noteId}`);
    }
    return res.send(note);
};

exports.delete = async (req, res) => {
    const note = await Note.findByIdAndRemove(req.params.noteId);
    if (!note) {
        throw new Error(`Note not found with id ${req.params.noteId}`)
    }
    return res.send(note);
};


// class Notes {
//
// // Create and Save a new Note
//     static create = async (req, res) => {
//         // if(!req.body.content) {
//         //     return res.status(400).send({
//         //         message: "Note content can not be empty"
//         //     });
//         // }
//         const dated = await new Note().Note.find({}).lean();
//         console.log("dated====>",dated);
//         // const note = new Note({
//         //     title: req.body.title || "Untitled Note",
//         //     content: req.body.content
//         // });
//         // const saveData = await note.save();
//         //  if (!saveData) {
//         //      throw new Error('something went wrong');
//         //  }
//          return res.send(saveData);
//     };
//
//
// // Retrieve and return all notes from the database.
//     static findAll = async (req, res) => {
//
//     };
//
// // Find a single note with a noteId
//     static findOne = async (req, res) => {
//
//     };
//
// // Update a note identified by the noteId in the request
//     static update = async (req, res) => {
//
//     };
//
// // Delete a note with the specified noteId in the request
//     static delete = async (req, res) => {
//
//     }
//
// }
//
// module.export = Notes;
