const mongoose = require('mongoose');
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user');

    return response.json(blogs);    
})

blogsRouter.post('/', async (request, response) => {
    if (!request.body.title) {
        return response.status(400).end();
    }

    if (!request.body.url) {
        return response.status(400).end();
    }    
    
    if(!request.token) {
        return response.status(401).end();
    }        
    
    const blog = new Blog(request.body)
    blog.user = new mongoose.Types.ObjectId(request.user.id)

    try {
        const result = await blog.save();

        return response.status(201).json(result)
    } catch(error) {
        console.error('Error saving blog:', error.message);
        return response.status(500).json({ error: 'Internal server error' });
    }
})

blogsRouter.delete('/:id', async (request, response) => {
    try {
        if(!request.token) {
            return response.status(401).end();
        }  

        const blogPost = await Blog.findById(new mongoose.Types.ObjectId(request.params.id));
        if (!blogPost) {            
            return response.status(404).end();
        }   
        
        if (blogPost.user.toString() !== request.user.id) {
            return response.status(401).end();
        }
        
        await Blog.deleteOne(blogPost);
        
        return response.status(204).end();
    } catch(error) {
        return response.status(500).json(error);
    }
});

blogsRouter.put('/:id', async (request, response) => {
    try {
        const updatePayload = {
            url: request.body.url,
            likes: request.body.likes,
            title: request.body.title,
            author: request.body.author
        }
        
        const blogPost = await Blog.findByIdAndUpdate(
            new mongoose.Types.ObjectId(request.params.id),
            updatePayload);
        
        return response.status(200).json(blogPost);
    } catch(error) {
        return response.status(500).json(error);
    }
});

module.exports = blogsRouter