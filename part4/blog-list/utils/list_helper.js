const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length ?
        blogs.reduce((sum, current) => current.likes + sum, 0) : 0
}

const favoriteBlog = (blogs) => {
    return blogs.length ?
        blogs.reduce((fav, blog) => blog.likes > fav.likes ? fav = blog : fav) :
        {}
}

const mostBlogs = (blogs) => {
    let result = _.countBy(blogs, 'author')
    let authorWithMostBlogs = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b)

    return { author: authorWithMostBlogs, blogs: result[authorWithMostBlogs] }
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}