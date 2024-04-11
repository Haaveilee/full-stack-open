const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    console.log("i am in post")
    console.log(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        }).catch(error => {
        console.error('Error saving blog:', error.message);
        response.status(500).json({ error: 'Internal server error' });
    });
})

module.exports = blogsRouter