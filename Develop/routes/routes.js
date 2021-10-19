const path = require('path');
const app = express()


app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
})

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);