const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const app = express();
// const NoteCtrl = require('./routes/note.routes.js');

mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// Require Notes routes
require('./routes/note.routes.js')(app);
// new NoteCtrl(app);

// listen for requests
app.listen(4040, () => {
    console.log("Server is listening on port 4040");
});
