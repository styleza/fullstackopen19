const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', (request, response) => {
    Blog
        .find({})
        .populate('user')
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.get('/:blogId', (request, response) => {
    Blog
        .findById(request.params.blogId)
        .populate('user')
        .then(blogs => {
            response.json(blogs)
        })
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = request.token

    try {

        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            likes: body.likes || 0,
            url: body.url,
            user: user
        })

        const savedBlog = await blog.save()
        if(savedBlog){
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
            response.status(201).json(savedBlog)
        } else {
            response.status(500).end()
        }
    } catch(e){
        next(e)
    }
})

blogRouter.put('/:blogId', async (request, response, next) => {
    const blog = await Blog.findByIdAndUpdate(request.params.blogId, request.body)
    if(blog) {
        response.status(200).json(blog)
    } else {
        response.status(404).end()
    }
})

blogRouter.delete('/:blogId', async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(request.params.blogId)

    if(blog){
        if(blog.user.toString() !== decodedToken.id){
            response.status(403).end()
            return
        }
        await Blog.findByIdAndRemove(request.params.blogId)
        response.status(200).json(blog)
    } else {
        response.status(404).end()
    }
})

module.exports = blogRouter