const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer '))
    {
        return authorization.replace('Bearer ', '')
    }
    else{
        return null
    }
}

blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(blogs)
})

blogsRouter.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if(!decodedToken.id)
    {
        return response.status(401).json({error:"Invalid Token"})
    }
    if (!blog.title || !blog.url){
        response.status(400).json(request.body)
    }
    else{
        const user = await User.findById(decodedToken.id)
        blog.user = user.id
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
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