const mongoose = require('mongoose')
const logger = require('./utils/logger')

const url = 'mongodb+srv://fullstackopen:7OGUQ5jywKbJC2AO@cluster0.5tbsnnk.mongodb.net/testNoteApp?retryWrites=true&w=majority&appName=Cluster0'

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

console.log('debugger')

const Note = mongoose.model('Note', noteSchema)

const note1 = new Note({
  content: 'test note 1',
  important: true
})

const note2 = new Note({
  content: 'test note 2',
  important: false
})

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(() => {
    logger.info('connected to MongoDB')
    note1.save()
      .then(savedNote => console.log(savedNote))
      .catch(error => console.log(error))
    note2.save()
      .then(savedNote => {
        console.log(savedNote)
        mongoose.connection.close()
      })
      .catch(error => console.log(error))

  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })



