const express = require ('express')
const path = require('path');
const route = require('./Develop/routes/routes')
const uniqid = require('uniqid')
// console.log(newid)
const newid = uniqid()
const app = express()
const PORT = 3001;

//middleware for parsing objects
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//middleware for sending static files like css
app.use(express.static('public'));

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
})
app.post('notes', (req,res) => {
    const { title, text } = req.body
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uniqid()
        }
    }
})

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);





app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);