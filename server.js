const express = require("express");
const path = require("path");

const api = require('./routes/routes.js')

const app = express();
const PORT = process.env.PORT || 3001;

const notesDB = require('./db/db.json')

//middleware for parsing objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware for sending static files like css
app.use(express.static("public"));

app.use('/api', api)

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Do I need this?
// app.post("/notes", (req, res) => {
//     res.sendFile(path.join(__dirname, "./public/notes.html"));
// });

app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
