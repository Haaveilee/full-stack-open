const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phonebookSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
},
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function(v) {
                // Regular expression to match the phone number format
                const phoneNumberRegex = /^(?:\d{2,3}-\d+)$/;
                return phoneNumberRegex.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Please use the format xx-xxxxxxxx(x) or xxx-xxxxxxxx(x).`
        },
        required: [true, 'Phone number is required']
    },
})
//const Contact = mongoose.model('Contact', phonebookSchema)


phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', phonebookSchema)