const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((c, i) => c+i.likes, 0)
}

const favouriteBlog = (blogs) => {
    if(blogs.length <= 0) return false

    return blogs.reduce((c, i) => i.likes > c.likes ? i : c, blogs[0])
}

const mostBlogs = (blogs) => {
    return _(blogs)
        .groupBy(i => i.author)
        .map((value, key) => ({author: key, blogs: value.length}))
        .maxBy(i => i.blogs)
}

const mostLikes = (blogs) => {
    return _(blogs)
        .groupBy(i => i.author)
        .map((value, key) => ({author: key, likes: totalLikes(value)}))
        .maxBy(i => i.likes)
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}