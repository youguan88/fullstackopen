const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest.agent(app)
const api2 = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./bloglist.test_helper')

describe('api with token', () => {
    beforeEach(async ()=>{
        await Blog.deleteMany({})
        await Blog.insertMany(helper.blogs)
        await User.deleteMany({})
        await Promise.all(helper.users.map(async user => await api.post('/api/users').send(user)))
        
        const login = await api.post('/api/login').send(helper.loginBody(helper.users[0]))
        api.auth(login.body.token, { type: 'bearer' });
    })

    test('retrieve all blogs',async ()=>{
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    })

    test('get returns id in response',async ()=>{
        let blogs = await api.get('/api/blogs')
        expect(blogs.body[0].id).toBeDefined()
    })

    test('post returns total number + 1 and correct content added', async () => {
        const newBlog = {
            title: "ABC",
            author: "New author",
            url: "http://abc.com",
            likes: 3,
        }
        await api.post('/api/blogs').send(newBlog).expect(201).expect('Content-Type', /application\/json/)
        let returnedBlogs = await api.get('/api/blogs')

        expect(returnedBlogs.body).toHaveLength(helper.blogs.length + 1)
        const titles = returnedBlogs.body.map(x=>x.title)
        expect(titles).toContain('ABC')
    })

    test('likes should default to 0 if property is missing from request',async ()=>{
        let returnedBlogs = await api.get('/api/blogs')

        expect(returnedBlogs.body).toHaveLength(helper.blogs.length)
        let likes = returnedBlogs.body.map(x=>x.likes) 
        likes.map(like => expect(like).toBeGreaterThanOrEqual(0))
    })

    test('post blogs with missing title or url returns 400',async ()=>{
        const newBlogs = [{
            author: "New author",
            url: "http://abc.com",
            likes: 3,
        },
        {
            title: "ABC",
            author: "New author",
            likes: 3,
        }]
        await api.post('/api/blogs').send(newBlogs[0]).expect(400)
        await api.post('/api/blogs').send(newBlogs[1]).expect(400)
    })

    test('delete is valid', async () => {
        const newBlogs = {
            title: "ABC",
            author: "New author",
            url: "http://abc.com",
            likes: 3,
        }
        const addedBlog = await api.post('/api/blogs').send(newBlogs)
        const returnedBlogs = await api.get('/api/blogs')
        await api.delete(`/api/blogs/${addedBlog.body.id}`).expect(204)

        const newReturnedBlogs = await api.get('/api/blogs')
        expect(newReturnedBlogs.body).toHaveLength(returnedBlogs.body.length - 1)
        expect(newReturnedBlogs.body.map(x=> x.id)).not.toContain(addedBlog.body.id)
    })

    test('update is valid', async () => {
        const newBlogs = {
            title: "ABC",
            author: "New author",
            url: "http://abc.com",
            likes: 3,
        }
        const addedBlog = await api.post('/api/blogs').send(newBlogs)

        const newLikes = 100
        const requestBody = {...addedBlog.body, likes: newLikes}
        await api.put(`/api/blogs/${addedBlog.body.id}`).send(requestBody).expect(204)
        
        const newReturnedBlogs = await api.get('/api/blogs')
        const updatedBlog = newReturnedBlogs.body.filter(blog => blog.id === addedBlog.body.id)
        expect(updatedBlog[0].likes).toBe(newLikes)
    })


})

describe('api without token', () => {
    test('post blogs fail if token is not provided',async ()=>{
        const newBlog = {
            author: "New author",
            url: "http://abc.com",
            likes: 3,
        }
        await api2.post('/api/blogs').send(newBlog).expect(401)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})