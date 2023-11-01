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

blogsRouter.delete('/api/blogs/:id', async(request, response) => {
    const id = request.params.id
    if (!id){
        response.status(400).json({error:"id is not provided"})
    }
    else
    {
        await Blog.findByIdAndDelete(id)
        response.send(204).end()
    }
})

blogsRouter.put('/api/blogs/:id', async(request, response) => {
    const id = request.params.id
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    if (!id){
        response.status(400).json({error:"id is not provided"})
    }
    else
    {
        await Blog.findByIdAndUpdate(id, blog, {new:true})
        response.send(204).end()
    }
})



module.exports = blogsRouter