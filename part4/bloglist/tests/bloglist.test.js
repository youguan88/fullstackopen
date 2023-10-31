const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
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
        likes: 2,
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

    afterAll(async () => {
        await mongoose.connection.close()
    })
})