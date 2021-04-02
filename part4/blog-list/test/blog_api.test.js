const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjs = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjs.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('should have 3 blogs in db', async () => {
    const testBlogs = await helper.blogsInDb()

    expect(testBlogs.length).toBe(3)

})

afterAll(() => {
    mongoose.connection.close()
})