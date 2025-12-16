const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
})

// Customize how Mongoose documents are converted to JSON (e.g. modify, remove, or rename fields)
// It only affects what will be sent to the frontend. It won't affect what will be sent from database to the backend.
// In other words, this will be run only when we call methods such as response.json(blogs).
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