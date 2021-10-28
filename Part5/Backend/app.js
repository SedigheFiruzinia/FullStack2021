const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require ('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())


app.use(middleware.userExtractor)
app.use(middleware.requestLogger)



app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV === 'test'){
  const testingRouter = require('./controllers/testing')
  console.log('Test')
  app.use('/api/testing',testingRouter)
}

//errorHandler

const errorHandler = (error, request, response, next) => {
  
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error) 
}

app.use(errorHandler)

module.exports = app

