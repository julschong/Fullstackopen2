/* eslint-disable no-undef */
const express = require('express')
require('dotenv').config({ path: __dirname + '\\.env' })
require('express-async-errors')
const { unknownEndPoint, errorHandler, customMorgan, tokenExtractor } = require('./utils/middleware')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const blogRouter = require('./controllers/blogRouter')
const userRouter = require('./controllers/userRouter')
const loginRouter = require('./controllers/loginRouter')

const app = express()
app.use(cors())

// configure app to use express built-in json-parser
app.use(express.json())


// use tiny morgan with additional request body
app.use(customMorgan)

const mongoUrl = config.NODE_ENV === 'test'
    ? config.TEST_MONGO_URL
    : config.MONGO_URL

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

// set default path of blogRouter to /api/blogs
// set app to use blogRouter

app.use(tokenExtractor)

app.use('/api/blogs', blogRouter)

app.use('/api/users', userRouter)

app.use('/api/login', loginRouter)

// use errorHandler as a generic response.status(400) with error code in the body
app.use(errorHandler)

// use unknownEndPoint as generic response to unknown endpoints
app.use(unknownEndPoint)

module.exports = app

