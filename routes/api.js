const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require('fs');

const storedData = require('../db/db.json');

//function that writes to db.json
const writeToDb = (newNotes) => {
    fs.writeFileSync(path.resolve(__dirname, "../db/db.json"), JSON.stringify(newNotes));
}

//get route that sends the stored notes from db.json
router.get('/notes', (req, res) => {
    let notes = storedData.map((note, index) => ({
        ...note,
        id: index+1
    }));

    res.json(notes);
});

//post route that saves a note to db.json
router.post('/notes', (req, res) => {
    let notes = storedData;
    notes.push(req.body);
    writeToDb(notes);

    res.json(notes);
});

//delete route that deletes a note with given id
router.delete('/notes/:id', (req, res) => {
    let notes = storedData;
    notes.splice(req.params.id, 1);
    writeToDb(notes);

    res.json(notes);
});

module.exports = router;