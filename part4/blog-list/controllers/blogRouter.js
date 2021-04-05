const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
})

blogRouter.get('/:id', async function (request, response) {
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)
    blog ?
        response.json(blog) :
        response.status(400).end()

})

blogRouter.post('/', async (request, response) => {
    const token = request.token
    const decodedToken = jwt.verify(token, config.SECRET)

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user._id
    })

    const savedAndReturnedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedAndReturnedBlog._id)
    await user.save()

    response.json(savedAndReturnedBlog)

})

blogRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id
    const deletedBlog = await Blog.findByIdAndDelete(blogId)
    deletedBlog ? response.json(deletedBlog) : response.status(404).end()

})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    let newBlog = {}

    if (!body.likes) {
        newBlog = {
            title: body.title,
            author: body.author,
            url: body.url,
        }
        await Blog.findByIdAndUpdate(request.params.id, newBlog)
        response.status(204).end()
    } else {
        await Blog.findByIdAndUpdate(request.params.id, { likes: body.likes })
        response.status(204).end()
    }

})



module.exports = blogRouter