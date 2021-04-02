const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Title 1',
        author: 'Author 1',
        url: 'http://url1.com',
        likes: 1
    },
    {
        title: 'Title 2',
        author: 'Author 2',
        url: 'http://url2.com',
        likes: 2
    },
    {
        title: 'Title 3',
        author: 'Author 3',
        url: 'http://url3.com',
        likes: 3
    },
]

const nonExistingId = async () => {
    const blog = new Blog({
        title: "This does not exist in DB yet",
        author: "Unknown Author",
        url: "http://unknownendpoint.com",
        likes: 10000
    })

    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}