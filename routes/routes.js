const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const uniqid = require("uniqid");
const notesDB = require("../db/db.json");
const { readFromFile, readAndAppend } = require("../helper/fsHelper.js");

app.get("/notes", (req, res) => {
    readFromFile("./db/db.json").then((data) => {
        res.json(JSON.parse(data));
        // res.redirect('/notes')
    });
    // res.send(notesDB);
    // console.info(`${req.method} request recieved`)
});

app.post("/notes", (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uniqid(),
        };
        readAndAppend(newNote, "./db/db.json");
        // fs.readFile("./db/db.json", "utf8", (err, data) => {
        //     if (err) {
        //         console.error(err);
        //     }
        //     const noteData = JSON.parse(data);
        //     noteData.push(newNote);
        //     fs.writeFile(
        //         "./db/db.json",
        //         JSON.stringify(noteData, null, 4),
        //         (err, result) => {
        //             if (err) console.error(err);
        //         }
        //     );
        // });
    } else res.status(500).json("Error in saving note");
});

// Need to add req/res somewhere
app.delete(`/notes/:id`, (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
        }
        const noteData = JSON.parse(data);
        const newNoteData = noteData.filter((e) => e.id != req.params.id);;
        fs.writeFile(
            "./db/db.json",
            JSON.stringify(newNoteData, null, 4),
            (err, result) => {
                if (err) console.error(err);
                res.redirect('/notes')
            }
        );
    });
});

module.exports = app;
