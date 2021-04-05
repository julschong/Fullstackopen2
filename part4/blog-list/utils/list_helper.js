const _ = require('lodash')

const dummy = () => {
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
    const result = _.countBy(blogs, 'author')
    const authorWithMostBlogs = Object.keys(result).reduce((a, b) => result[a] > result[b] ? a : b)

    return { author: authorWithMostBlogs, blogs: result[authorWithMostBlogs] }
}

const mostLikes = (blogs) => {
    const result = _(blogs)
        .groupBy('author')
        .map((obj, key) => ({
            'author': key,
            'likes': _.sumBy(obj, 'likes')
        }))
        .maxBy('likes')

    return result
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}