const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  // Blog.find() returns a Promise that resolves to an array of Mongoose documents (blogs)
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog(request.body)

  blog.user = user._id

  const newBlog = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(204).end()
  }

  // Status code 403: Forbidden
  if (user.id.toString() !== blog.user.toString()) {
    return response.status(403).json({ error: 'user not authorized to delete this blog' })
  }

  user.blogs = user.blogs.filter(blogId => blogId.toString() !== blog.id.toString())
  await user.save()
  await blog.deleteOne()
  response.status(204).send()
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { title, author, url, likes, user } = request.body
  const updatedBlog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user
  }
  const blog = await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  if (!blog) {
    return response.status(404).end()
  }
  response.json(blog)
})

module.exports = blogsRouter