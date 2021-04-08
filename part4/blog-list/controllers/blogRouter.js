const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')


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

blogRouter.post('/', userExtractor, async (request, response) => {
    const token = request.token
    const decodedToken = request.user

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
    const body = request.body

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        content: body.content,
        user: user._id
    })

    let savedAndReturnedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedAndReturnedBlog._id)
    await user.save()

    savedAndReturnedBlog = await Blog.findById(savedAndReturnedBlog._id).populate('user', { username: 1, name: 1 })

    response.json(savedAndReturnedBlog)

})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
    const token = request.token
    const decodedToken = request.user

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blogId = request.params.id
    const blogToDelete = await Blog.findById(blogId)

    if (blogToDelete.user.toString() === decodedToken.id) {
        const deletedBlog = await blogToDelete.delete()
        deletedBlog ? response.json(deletedBlog) : response.status(404).end()
    } else {
        return response.status(401).json({ error: 'not authorized to delete this post' })
    }

})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body

    let newBlog = {}

    try {
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
    } catch (err) {
        res.status(400).json({ error: err.message })
    }


})



module.exports = blogRouter