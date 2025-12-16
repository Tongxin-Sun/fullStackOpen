const Blog = require('../models/blog')

const initialBlogs = [
  {
    '_id': '690e924549095f032f31c620',
    'title': 'The AI Bubble Is About To Burst, But The Next Bubble Is Already Growing',
    'author': 'Will Lockett',
    'url': 'https://medium.com/@wlockett/the-ai-bubble-is-about-to-burst-but-the-next-bubble-is-already-growing-383c0c0c7ede',
    'likes': 16300,
    '__v': 0
  },
  {
    '_id': '691276689888a2880ac09e61',
    'title': 'test blog title 2',
    'author': 'test author',
    'url': 'https://medium.com/@testauthor/testblog',
    'likes': 20000,
    '__v': 0
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, blogsInDb }