const _ = require('lodash')

const dummy = (blogs) => 1

const totalLikes = (blogs) => blogs.reduce((acc, blog) => acc + blog.likes, 0)

const favoriteBlog = (blogs) => (
    blogs.reduce((curr, blog) => 
        blog.likes > curr.likes ? blog : curr, 
    blogs[0])
)

const mostBlogs = (blogs) => ( blogs.length > 0 ? (
    _(blogs)
        .groupBy('author')
        .values()
        .max()
        .reduce((acc, x) => ({
            author: x.author, 
            blogs: acc.blogs + 1 
        }), { author: undefined, blogs: 0 })
    ) : undefined
)

const mostLikes = (blogs) => ( blogs.length > 0 ? (
    _(blogs)
        .groupBy('author')
        .values()
        .maxBy(totalLikes)
        .reduce((acc, x) => ({
            author: x.author, 
            likes: acc.likes + x.likes
        }), { author: undefined, likes: 0 })
    ) : undefined
)

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}