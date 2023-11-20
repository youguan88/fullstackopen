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
app.use('/api/blogs/', middleware.tokenExtractor, middleware.userExtractor, blogsRouter)
app.use('/api/users/', usersRouter)
if(process.env.NODE_ENV === 'test'){
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing/', testingRouter)
}
app.use(middleware.errorHandler)

module.exports = app