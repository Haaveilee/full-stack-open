const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

let phonebook =
    [
        {
            "id": 1,
            "name": "Arto Hellas",
            "number": "040-123456"
        },
        {
            "id": 2,
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "id": 3,
            "name": "Dan Abramov",
            "number": "12-43-234345"
        },
        {
            "id": 4,
            "name": "Mary Poppendieck",
            "number": "39-23-6423122"
        }

    ]

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
    let numberOfItems = phonebook.length;

    let timeNow = new Date();

    response.send(`
        <p>Phonebook has info for ${numberOfItems} people</p>
        <p>${timeNow}</p>
    `);

})

app.get('/api/persons', (request, response) => {

    response.json(phonebook)
})

app.get('/api/person/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = phonebook.find(contact => contact.id === id)
    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/person/:id', (request, response) => {

    const id = Number(request.params.id)
    phonebook = phonebook.filter(contact => contact.id !== id)
    response.status(204).end()
})



app.post('/api/persons', (request, response) => {
    const body = request.body
    //check if name already exists
    let nameExists = phonebook.some(contact => contact.name === body.name);
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    else if (nameExists) {
        return response.status(400).json({
            error: 'name already exists'
        })

    }


    const contact = {
        name: body.name,
        number: body.number,
        id: generateId(),
    }

    phonebook = phonebook.concat(contact)

    response.json(contact)
})

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})