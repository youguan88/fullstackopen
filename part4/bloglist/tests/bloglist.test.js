const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const { first } = require('lodash')
const blogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    }
]


describe('api', () => {
    beforeEach(async ()=>{
        await Blog.deleteMany({})
        await Blog.insertMany(blogs)
    })

    test('retrive all blogs',async ()=>{
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
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
        let returnedBlogs = await api.get('/api/blogs')
        expect(returnedBlogs.body).toHaveLength(blogs.length + 1)
        const titles = returnedBlogs.body.map(x=>x.title)
        expect(titles).toContain('ABC')
    })

    test('likes should default to 0 if property is missing from request',async ()=>{
        let returnedBlogs = await api.get('/api/blogs')
        expect(returnedBlogs.body).toHaveLength(blogs.length)
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
        const returnedBlogs = await api.get('/api/blogs')
        const firstID = returnedBlogs.body[0].id
        await api.delete(`/api/blogs/${firstID}`).expect(204)

        const newReturnedBlogs = await api.get('/api/blogs')
        expect(newReturnedBlogs.body).toHaveLength(returnedBlogs.body.length - 1)
        expect(newReturnedBlogs.body.map(x=> x.id)).not.toContain(firstID)
    })

    test('update is valid', async () => {
        const returnedBlogs = await api.get('/api/blogs')
        const firstID = returnedBlogs.body[0].id
        const newLikes = 100
        const requestBody = {...returnedBlogs[0], likes: newLikes}
        await api.put(`/api/blogs/${firstID}`).send(requestBody).expect(204)
        
        const newReturnedBlogs = await api.get('/api/blogs')
        const updatedBlog = newReturnedBlogs.body.filter(blog => blog.id === firstID)
        expect(updatedBlog[0].likes).toBe(newLikes)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})