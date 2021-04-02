const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length ?
        blogs.reduce((sum, current) => current.likes + sum, 0) : 0
}

module.exports = {
    dummy, totalLikes
}