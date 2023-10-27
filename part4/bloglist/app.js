const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blog')
const config = require('./utils/config')

mongoose.connect(config.mongoUrl)

app.use(cors())
app.use(express.json())
app.use(blogsRouter)

module.exports = app