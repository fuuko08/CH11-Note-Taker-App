const router = require('express').Router();
const store = require('../db/Store');

// Get exisiting notes
router.get('/notes', (req, res) => {
    store.getNote()
        .then(notes => {res.json(notes)})
        .catch(err => {res.status(500).json(err)})
})

// Post new notes
router.post('/notes', (req, res) => {
    store.addNote(req.body)
        .then(note => {res.json(note)})
        .catch(err => {res.status(500).json(err)})
})

// Delete notes
router.delete('/notes/:id', (req, res) => {
    store.deleteNote(req.params.id)
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json(err))
})

module.exports = router;