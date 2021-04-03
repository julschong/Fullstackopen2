const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('getall', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('should have 3 blogs in db', async () => {
        const response = await api.get('/api/blogs')
        const titles = response.body.map((r) => r.title)
        expect(titles).toHaveLength(helper.initialBlogs.length)
    })
})

describe('getOne', () => {
    test('should return as json', async () => {
        const prefetch = await api.get('/api/blogs')
        const testFindId = prefetch.body[0].id

        const response = await api
            .get(`/api/blogs/${testFindId}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.id).toBe(testFindId)
    })
})

describe('deleteOne', () => {
    test('should delete id:1 blog', async () => {
        let response = await api.get('/api/blogs')
        const id = response.body[0].id
        await api.delete(`/api/blogs/${id}`)
        response = await api.get('/api/blogs')
        response = response.body.map((blog) => blog.id)

        expect(response.some((el) => el === id)).toBe(false)
    })
})

describe('postOne', () => {
    test('should post and contain that blog', async () => {
        const newBlog = {
            title: 'This does not exist in DB yet',
            author: 'Unknown Author',
            url: 'http://unknownendpoint.com',
            likes: 10000,
        }
        await api.post('/api/blogs').send(newBlog)

        const response = await api.get('/api/blogs')
        const blogsAuthorsArray = response.body.map((blog) => blog.author)
        expect(blogsAuthorsArray).toContain('Unknown Author')
    })

    test('should default likes to 0 if likes prop is missing', async () => {
        const newBlog = {
            title: 'This does not exist in DB yet',
            author: 'Unknown Author',
            url: 'http://unknownendpoint.com',
        }
        const response = await api.post('/api/blogs').send(newBlog)

        expect(response.body.likes).toBe(0)
    })

})

test('should have id instead of _id, testing toJSON()', async () => {
    const newBlog = {
        title: 'This does not exist in DB yet',
        author: 'Unknown Author',
        url: 'http://unknownendpoint.com',
        likes: 10000,
    }
    const response = await api.post('/api/blogs').send(newBlog).expect(201)
    expect(response.body.id).toBeDefined()
})

afterAll(async () => {
    await mongoose.connection.close()
})
