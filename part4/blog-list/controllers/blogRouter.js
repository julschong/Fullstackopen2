const blogRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', async function (request, response) {
    const blogId = request.params.id
    const blog = await Blog.findById(blogId)
    blog ?
        response.json(blog) :
        response.status(400).end()

})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    const savedAndReturnedBlog = await blog.save()
    response.status(201).json(savedAndReturnedBlog)

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