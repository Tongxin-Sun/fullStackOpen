const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const morgan = require('morgan')

const app = express()

logger.info('connecting to', config.MONGODB_URI)

// We don't need to close the connection explicitly,
// because the connection only needs to close when the process/app exits (i.e., when the node shutdown).
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

// Request preprocessing
//morgan.token('body', (req) => JSON.stringify(req.body))
app.use(express.json())
//app.use(morgan(' :method :url :status :res[content-length] - :response-time ms :body'))

// Blogs API handler
app.use('/api/blogs', blogsRouter)

// Request postprocessing
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app

