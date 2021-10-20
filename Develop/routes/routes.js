const path = require("path");
const express = require("express");
const app = express();

const notesGet = () => {
    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
    });

    app.post("notes", (req, res) => {
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
                // console.log(bookData);
                noteData.push(stringNote);
                fs.writeFile(
                    "./db/db.json",
                    JSON.stringify(noteData, null, 4),
                    (err) => {
                        console.log("added to the file");
                    }
                );
            });
        } else res.status(500).json("Error in saving note");
    });
};

module.exports = notesGet();