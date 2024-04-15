const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    try {
        const { username, name, password } = request.body
        
        if (!username || username.length < 3) {
            return response.status(401).end();
        }

        if (!password || password.length < 3) {
            return response.status(401).end();
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = new User({
            username: username,
            password: passwordHash,
            name: name,
        })

        const savedUser = await user.save()

        return response.status(201).json(savedUser)
    } catch(error) {
        return response.status(500).send(error);
    }
});

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs');

    return response.status(200).json(users);
})

module.exports = usersRouter
