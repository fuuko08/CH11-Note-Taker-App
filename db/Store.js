const util = require('util');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');

const readFileStore = util.promisify(fs.readFile);
const writeFileStore = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileStore('db/db.json', 'utf8');
    }

    write(note) {
        return writeFileStore('db/db.json', JSON.stringify(note));
    }

    addNote(note) {
        const {title, content} = note;
        if (!title || !content) {
            throw new Error ("Please enter title and content")
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