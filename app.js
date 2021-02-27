// const validator = require('validator')
const yargs = require('yargs')
// const add = require('./utils')
const notes = require('./notes')
// const { loadNote } = require('./notes')
const { argv } = require('yargs')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log(notes.addNote(argv.title, argv.body))
    }
})


yargs.command({
    command: 'del',
    describe: 'Deltes a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log(notes.deleteNote(argv.title))
    }
})


yargs.command({
    command: 'list',
    describe: 'lists the title of all the notes in file',
    handler(){
        const not = notes.loadNote()

        not.forEach( (note) => {
            console.log(note.title+ ' : '+ note.body)
        })
    }
})

yargs.command({
    command: 'read',
    describe: 'Reads the body of the note provided the title',
    builder:{
        title:{
            describe: 'Note title you want to read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        console.log(notes.readNote(argv.title))
    }
})

yargs.argv;