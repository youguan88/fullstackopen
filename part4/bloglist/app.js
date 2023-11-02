const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

require('express-async-errors')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())
app.use('/api/login/', loginRouter)
app.use('/api/blogs/', middleware.tokenExtractor, blogsRouter)
app.use('/api/users/', usersRouter)
app.use(middleware.errorHandler)

module.exports = app