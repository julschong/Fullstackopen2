/* eslint-disable no-undef */
const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogRouter')
const mongoose = require('mongoose')
const { unknownEndPoint, errorHandler, customMorgan } = require('./utils/middleware')

require('dotenv').config({ path: __dirname + '\\.env' })

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())

// configure app to use express built-in json-parser
app.use(express.json())

// use tiny morgan with additional request body
app.use(customMorgan)

// set default path of blogRouter to /api/blogs
// set app to use blogRouter
app.use('/api/blogs', blogRouter)

// use errorHandler as a generic response.status(400) with error code in the body
app.use(errorHandler)

// use unknownEndPoint as generic response to unknown endpoints
app.use(unknownEndPoint)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

