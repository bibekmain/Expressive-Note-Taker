const express = require('express');
const path = require('path');
const api = require('./routes/api.js')

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', api);

//sets the root dir to the public dir
app.use (express.static('public'));

//root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})