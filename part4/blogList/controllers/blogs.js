const BlogsRouter = require('express').Router()
const Blog = require('../models/blog')

BlogsRouter.get('/', (request, response) => {
  // Blog.find() returns a Promise that resolves to an array of Mongoose documents (blogs)
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

BlogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

module.exports = BlogsRouter