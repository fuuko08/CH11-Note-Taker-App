const util = require('util');
const fs = require('fs');
const uuid = require('uuid');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFile('db/db.json', 'utf-8');
    }

    write(note) {
        return writeFile('db/db.json', JSON.stringify(note))
    }

    addNote(note) {
        const {title, content} = note
        if (!title || !content) {
            throw new Error ("Please enter title and content")
        }

        const newNote = { title, text, id: uuid( )}
        return this.getNote()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => this.newNote)
    }

    getNote() {
        return this.read()
            .then(notes => { return JSON.parse(notes) || []; })
    }

    deleteNote(id) {
        return this.getNote()
            .then(notes => notes.filter(note => note.id !== id))
            .then(remainNote => this.write(remainNote))
    }
}

module.exports = new Store();