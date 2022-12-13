const util = require('util');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');

const readFileStore = util.promisify(fs.readFile);
const writeFileStore = util.promisify(fs.writeFile);

class Store {
    constructor() {
        this.lastId = 0;
    }
    
    read() {
        return readFileStore('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileStore('db/db.json', JSON.stringify(note));
    }

    addNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error ("Please enter title and text")
        }

        const newNote = { title, text, id: uuidv1()};

        return this.getNote()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }

    getNote() {
        return this.read()
            .then(notes => {
                let parsedNotes;

                try {
                    parsedNotes = [].concat(JSON.parse(notes));
                } catch (err) {
                    parsedNotes = [];
                }

                return parsedNotes;
            });
    }

    deleteNote(id) {
        return this.getNote()
            .then(notes => notes.filter(note => note.id !== id))
            .then(remainNote => this.write(remainNote));
    }
}

module.exports = new Store();