const blogRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.get('/:id', async function (request, response) {
    const blogId = request.params.id

    const blog = await Blog.findOne({ _id: blogId })
    response.json(blog)

})

blogRouter.post('/', async (request, response, next) => {
    const blog = new Blog(request.body)

    const savedAndReturnedBlog = await blog.save()
    response.status(201).json(savedAndReturnedBlog)

})

blogRouter.delete('/:id', async (request, response) => {
    const blogId = request.params.id
    const deletedBlog = await blog.findByIdAndDelete(blogId)
    deletedBlog ? response.json(deletedBlog) : response.status(404).end()

})



module.exports = blogRouter