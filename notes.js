const fs = require('fs')
const chalk = require('chalk')


const addNote = (title,body) => {
    const notes = loadNote()
    const duplicateNote = notes.find( note => note.title === title)
    if (!duplicateNote){
        const note = {
            title: title,
            body: body
        }
        notes.push(note)
        saveNote(notes)
        return chalk.green.inverse('Note added...')
    } else{
        return chalk.red.inverse('Note Title is taken try another one!')
    }
}

const saveNote = (notes) => {
    fs.writeFileSync('./notes.json',JSON.stringify(notes))
}

const loadNote = () => {
    try {
        const dataBuffer = fs.readFileSync('./notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (error) {
        // console.log(error.toString())
        return []
    }
}

const deleteNote = (title) => {
    const notes = loadNote()
    // console.log(notes)
    const selectedNote = notes.filter((note) => note.title === title)
    // console.log(selectedNote)
    
    if (selectedNote.length < notes.length){
        saveNote(selectedNote)
        return chalk.green.inverse("Note removed!")
    }else{
        return chalk.red.inverse("Note not found")
    }
    
}

const readNote = (title) =>{
    const notes = loadNote()
    
    const noteFound = notes.find(note => note.title === title)

    if (noteFound){
        return chalk.italic(noteFound.title) + ' : ' +noteFound.body
    } else{
        return chalk.red('No note Found')
    }
}


module.exports = {
    addNote: addNote,
    loadNote: loadNote,
    deleteNote: deleteNote,
    readNote: readNote
}