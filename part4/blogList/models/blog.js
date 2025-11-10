const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// Customize how Mongoose documents are converted to JSON (e.g. modify, remove, or rename fields)
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // Use toString because _id is an object under the hood
    // although it looks like a string when we console.log it
    returnedObject.id = document._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)