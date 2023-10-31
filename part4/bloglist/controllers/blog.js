const Blog = require('../models/blog')
const blogsRouter = require('express').Router()

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.title || !blog.url){
        response.status(400).json(request.body)
    }
    else{
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    }
})

module.exports = blogsRouter