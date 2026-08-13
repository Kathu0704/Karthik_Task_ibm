// app.js
// Import Express framework
const express = require('express');
// Import body-parser middleware
// It helps us read data submitted through HTML forms
const bodyParser = require('body-parser');
// Array to store our notes
// Initially, one note is already present
const notes = [
    {
        noteId: 1,
        noteContent: "Hey, Prasunamba you can add your important notes here."
    }
];
// Create an Express application
const app = express();
// Tell Express that we are using EJS as the template/view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Parse JSON data sent by the client
app.use(bodyParser.json());
// Parse data submitted through HTML forms
app.use(bodyParser.urlencoded({
    extended: true
}));

// --------------------------------------------------
// GET /
// Display all notes
// --------------------------------------------------

app.get("/", function (req, res) {

    // Render home.ejs
    // Send the notes array to the EJS page as "data"
    res.render("home", {
        data: notes
    });
});

// --------------------------------------------------
// POST /
// Add a new note
// --------------------------------------------------
app.post("/", (req, res) => {

    // Get the note content submitted from the form
    const noteContent = req.body.noteContent;

    // Generate a new ID
    const noteId = notes.length + 1;

    // Add the new note to the notes array
    notes.push({
        noteId: noteId,
        noteContent: noteContent
    });

    // Display the updated list of notes
    res.render("home", {
        data: notes
    });
});
// --------------------------------------------------
// POST /update
// Update an existing note
// --------------------------------------------------

app.post('/update', (req, res) => {

    // Get note ID submitted by the form
    var noteId = req.body.noteId;

    // Get updated note content
    var noteContent = req.body.noteContent;

    // Search through all notes
    notes.forEach(note => {

        // Find the note with the matching ID
        if (note.noteId == noteId) {

            // Update its content
            note.noteContent = noteContent;
        }
    });

    // Display the updated notes
    res.render("home", {
        data: notes
    });
});
// --------------------------------------------------
// POST /delete
// Delete an existing note
// --------------------------------------------------
app.post('/delete', (req, res) => {

    // Get the ID of the note to delete
    var noteId = req.body.noteId;

    // Variable used to keep track of the array position
    var j = 0;

    // Loop through all notes
    notes.forEach(note => {

        j = j + 1;

        // Find the note with the matching ID
        if (note.noteId == noteId) {

            // Remove the note from the array
            // j - 1 gives the array index
            notes.splice((j - 1), 1);
        }
    });

    // Display the remaining notes
    res.render("home", {
        data: notes
    });
});
// --------------------------------------------------
// Start the server
// --------------------------------------------------
app.listen(3000, () => {

    console.log("App is running on port 3000");

});