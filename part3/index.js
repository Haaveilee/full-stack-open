require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Contact = require('./models/contact')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))
app.use((req, res, next) => {
    if (req.method === 'POST') {
        console.log('Body: ', req.body)
    }
    next()
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const generateId = () => {
    const maxId = phonebook.length > 0
        ? Math.max(...phonebook.map(n => n.id))
        : 0
    return maxId + 1
}



app.get('/info', (request, response) => {

    //calculate the number of items in the phonebook 

    Contact.find({}).then(result => {
        let timeNow = new Date();
        let numberOfItems = result.length

        console.log(numberOfItems)
        response.send(`
        <p>Phonebook has info for ${numberOfItems} people</p>
        <p>${timeNow}</p>
    `);
    })





})

app.get('/api/persons', (request, response) => {

    //response.json(phonebook)
    Contact.find({}).then(result => {
        result.forEach(c => {
            console.log(c)
        })

        response.json(result)
        //mongoose.connection.close()
    })
})

app.get('/api/persons/:id', (request, response, next) => {

    Contact.findById(request.params.id).then(contact => {
        if(contact){
            response.json(contact)
        }
        else{
            console.log(error)
            response.status(404).end()

        }

    }).catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response,next) => {

    const id = (request.params.id)
    console.log(id)
    Contact.findByIdAndDelete(id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))

})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save().then(result => {
        const message = "added "+body.name+" number "+body.number+" to phonebook"
        console.log(message)
        response.json(result)

    })

})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const contact = {
        name: body.name,
        number: body.number
    }

    Contact.findByIdAndUpdate(request.params.id, contact, { new: true, runValidators: true, context: 'query' })
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})


app.use(unknownEndpoint)
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.js, also all the routes should be registered before this!
app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})