const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')


const api = supertest(app)



describe('getAll users', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initialUsers)
    })

    test('should return status 200 and json', async () => {
        await api.get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('should have 2 users in db', async () => {
        const res = await api.get('/api/users')

        expect(res.body).toHaveLength(helper.initialUsers.length)
    })

    afterEach((done) => {
        done()
    })
})

describe('postOne user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await User.insertMany(helper.initialUsers)
    })

    test('should have 3 users in db afterward', async () => {
        const newUser = {
            username: 'goopmarbfoosh',
            name: 'Goopy Marby Fooshy',
            password: 'gmf123321A'
        }
        await api.post('/api/users').send(newUser)
        const users = await helper.usersInDb()
        expect(users.length).toBe(helper.initialUsers.length + 1)
    })

    test('should get error message saving same userName', async () => {
        const newUser = {
            username: 'julschong',
            name: 'this is duplicate',
            password: 'Duplicate123'
        }
        await api.post('/api/users').send(newUser).expect(400)
    })


    afterEach((done) => {
        done()
    })
})


afterAll(async (done) => {
    done()
    await mongoose.connection.close()
})