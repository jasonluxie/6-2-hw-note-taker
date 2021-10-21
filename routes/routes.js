const express = require("express");
const fs = require('fs')
const path = require("path");
const app = express();
const uniqid = require("uniqid");
const notesDB = require('../db/db.json')

app.get("/notes", (req, res) => {
    res.json(notesDB);
});

app.post("/notes", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uniqid(),
        };
        // const stringNote = JSON.stringify(newNote);
        fs.readFile("./db/db.json", "utf8", (err, data) => {
            if (err) {console.error(err)};
            const noteData = JSON.parse(data);
            noteData.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 4), (err, result) => {
                if (err) console.error(err)
            });
        });
    } else res.status(500).json("Error in saving note");
});

module.exports = app;
