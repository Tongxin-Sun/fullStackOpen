const BlogsRouter = require('express').Router()
const Blog = require('../models/blog')

BlogsRouter.get('/', async (request, response) => {
  // Blog.find() returns a Promise that resolves to an array of Mongoose documents (blogs)
  const blogs = await Blog.find({})
  response.json(blogs)
})

BlogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const newBlog = await blog.save()
  response.status(201).json(newBlog)
})

module.exports = BlogsRouter