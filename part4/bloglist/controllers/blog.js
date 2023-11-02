const Blog = require('../models/blog')
const User = require('../models/user')
const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username:1, name:1})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    if (!blog.title || !blog.url){
        response.status(400).json(request.body)
    }
    else{
        const user = request.user
        blog.user = user.id
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async(request, response) => {
    const id = request.params.id
    const user = request.user
    if (!id){
        response.status(400).json({error:"id is not provided"})
    }
    else if (!user) {
        response.status(400).json({error:"user does not exists"})
    }
    else
    {
        const blog = await Blog.findById(id)
        if (!blog || !blog.user)
        {
            response.status(400).json({error:"blog does not exist"})
        }
        else if (blog.user.toString() !== user._id.toString()){
            response.status(400).json({error:"User does not match"})
        }
        else {
            await Blog.findByIdAndDelete(id)
            response.sendStatus(204).end()
        }
    }
})

blogsRouter.put('/:id', async(request, response) => {
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