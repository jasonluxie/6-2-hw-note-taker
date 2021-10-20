const express = require("express");
const path = require("path");
const fs = require("fs");
// const route = require("./Develop/routes/routes");
const uniqid = require("uniqid");
// console.log(newid)
const newid = uniqid();
const app = express();
const PORT = 3001;

//middleware for parsing objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware for sending static files like css
app.use(express.static("Develop/public"));

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
            );
        });
    } else res.status(500).json("Error in saving note");
});

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
