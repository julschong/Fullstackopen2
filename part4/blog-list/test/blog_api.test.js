const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')



describe('getall', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
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
    afterEach(async (done) => {
        done()
    })
})

describe('getOne', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    test('should return as json and with correct id', async () => {
        const prefetch = await api.get('/api/blogs')
        const testFindId = prefetch.body[0].id

        const response = await api
            .get(`/api/blogs/${testFindId}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.id).toBe(testFindId)
    })

    test('should return 400 bad request if id not found', async () => {
        await api.get('/api/blogs/9998a5521855').expect(400)

    })
    afterEach(async (done) => {
        done()
    })
})

describe('deleteOne', () => {
    let token = null
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        let res = await api.post('/api/users')
            .send({
                username: 'julschong',
                name: 'Julius Lee',
                password: 'a0123456789A'
            })

        await Blog.insertMany(helper.initialBlogs.map(blog => {
            blog.user = res.body.id
            return blog
        }))
        const loginAttempt = await api.post('/api/login')
            .send({ username: 'julschong', password: 'a0123456789A' })

        token = 'bearer ' + loginAttempt.body.token

    })
    test('should delete id blog', async () => {
        let response = await api.get('/api/blogs')
        const id = response.body[0].id
        await api.delete(`/api/blogs/${id}`)
            .set('Authorization', token)
        response = await api.get('/api/blogs')
        response = response.body.map((blog) => blog.id)

        expect(response.some((el) => el === id)).toBe(false)
    })

    test('should return bad request 400 when deleting unknow id', async () => {
        await api.delete('/api/blogs/4065616d7c2cd124440288fc')
            .set('Authorization', token)
            .expect(400)
    })

    test('should return blah when malformed id', async () => {
        await api.delete('/api/blogs/asd8zxzds')
            .set('Authorization', token)
            .expect(400)
    })
    afterEach(async (done) => {
        done()
    })

})

describe('postOne', () => {
    let token = null
    beforeEach(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        let res = await api.post('/api/users')
            .send({
                username: 'julschong',
                name: 'Julius Lee',
                password: 'a0123456789A'
            })

        await Blog.insertMany(helper.initialBlogs.map(blog => {
            blog.user = res.body.id
            return blog
        }))
        const loginAttempt = await api.post('/api/login')
            .send({ username: 'julschong', password: 'a0123456789A' })

        token = 'bearer ' + loginAttempt.body.token

    })
    test('should post and contain that blog', async () => {
        const newBlog = {
            title: 'This does not exist in DB yet',
            author: 'Unknown Author',
            url: 'http://unknownendpoint.com',
            likes: 10000,
        }
        await await api.post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)

        const response = await api.get('/api/blogs')
        const blogsAuthorsArray = response.body.map((blog) => blog.author)
        expect(blogsAuthorsArray).toContain('Unknown Author')
    })

    test('should return 401 if authorization not provided', async () => {
        const newBlog = {
            title: 'This does not exist in DB yet',
            author: 'Unknown Author',
            url: 'http://unknownendpoint.com',
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })


    test('should default likes to 0 if likes prop is missing', async () => {
        const newBlog = {
            title: 'This does not exist in DB yet',
            author: 'Unknown Author',
            url: 'http://unknownendpoint.com',
        }
        const response = await api.post('/api/blogs')
            .set('Authorization', token)
            .send(newBlog)

        expect(response.body.likes).toBe(0)
    })
    afterEach(async (done) => {
        done()
    })
})

describe('putOne', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    test('update content without changing likes ', async () => {

        let response = await api.get('/api/blogs')
        const firstBlogId = response.body[0].id
        const newBlog = {
            title: 'This does not exist in DB yet',
            author: 'Unknown Author',
            url: 'http://unknownendpoint.com',
        }

        response = await api.put(`/api/blogs/${firstBlogId}`)
            .send(newBlog)
            .expect(204)

        response = await api.get(`/api/blogs/${firstBlogId}`)
        expect(response.body.title).toBe('This does not exist in DB yet')
        expect(response.body.likes).toBe(1)
    })

    test('update likes without changing content', async () => {
        let response = await api.get('/api/blogs')
        const firstBlogId = response.body[0].id
        const changeLikes = {
            likes: 2000
        }

        response = await api.put(`/api/blogs/${firstBlogId}`)
            .send(changeLikes)
            .expect(204)

        response = await api.get(`/api/blogs/${firstBlogId}`)
        expect(response.body.title).toBe('Title 1')
        expect(response.body.likes).toBe(2000)
    })
    afterEach(async (done) => {
        done()
    })

})


describe('general router test', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    test('should have id instead of _id, testing toJSON()', async () => {

        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

    test('should return bad request to random endpoint', async () => {
        const res = await api.get('/random-endpoint').expect(400)
        expect(res.body.error).toBe('unknown endpoint')
    })
    afterEach(async (done) => {
        done()
    })
})



afterAll(async () => {
    await mongoose.connection.close()
})
