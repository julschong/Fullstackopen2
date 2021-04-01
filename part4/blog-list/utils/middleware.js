const morgan = require('morgan')

const unknownEndPoint = (request, response) => {
    response.status(400).json({ error: 'unknown endpoint' })
}

const errorHandler = (err, request, response) => {
    response.status(400).json({ error: err.message })
}

morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})

const customMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')

module.exports = { unknownEndPoint, errorHandler, customMorgan }