const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')
const usersRouter = require('./controllers/user')
const config = require('./utils/config')
require('express-async-errors')

mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())
app.use(blogsRouter)
app.use('/api/users/', usersRouter)

module.exports = app