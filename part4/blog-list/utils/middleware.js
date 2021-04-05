const morgan = require('morgan')

const unknownEndPoint = (request, response) => {
    response.status(400).json({ error: 'unknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    res.status(400).json({ error: err.message })
}

morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    let token = null
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        token = authorization.substring(7)
    }

    req.token = token
    next()
}

const customMorgan = morgan(':method :url :status :res[content-length] - :response-time ms :body')

module.exports = { unknownEndPoint, errorHandler, customMorgan, tokenExtractor }