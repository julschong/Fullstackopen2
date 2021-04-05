const Blog = require('../models/blog')
const User = require('../models/user')

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
        title: 'This does not exist in DB yet',
        author: 'Unknown Author',
        url: 'http://unknownendpoint.com',
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

// ==============Users below==================================
const initialUsers = [
    {
        username: 'julschong',
        name: 'Julius Lee',
        password: 'a0123456789A'
    },
    {
        username: 'chongjuls',
        name: 'Christine Hong',
        password: 'a987654321A'
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users
}


module.exports = {
    initialBlogs, nonExistingId, blogsInDb,
    initialUsers, usersInDb
}