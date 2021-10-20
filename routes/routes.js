const express = require("express");
const path = require("path");
const app = express();
const notesDB = require('./db/db.json')

app.get("/api/notes", (req, res) => {
    res.json(notesDB);
});

app.post("/api/notes", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uniqid(),
        };
        const stringNote = JSON.stringify(newNote);
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) throw err;
            const noteData = JSON.parse(data);
            noteData.push(stringNote);
            fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 4));
        });
    } else res.status(500).json("Error in saving note");
});

module.exports = app;
