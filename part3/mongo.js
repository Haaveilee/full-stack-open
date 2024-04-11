const mongoose = require('mongoose')
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}
const password = process.argv[2]
console.log(password)
//`mongodb+srv://gaia:${password}@cluster0.krtmzav.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url = `mongodb+srv://gaia:${password}@cluster0.jx2unxt.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.set('strictQuery',false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  phone: String,
})
const Contact = mongoose.model('Contact', phonebookSchema)
const contactName = process.argv[3]
const contactNumber = process.argv[4]
const contact = new Contact({
  name: contactName,
  phone: contactNumber
})

if(contactName && contactNumber){
  contact.save().then(result => {
    const message = "added "+contactName+" number "+contactNumber+" to phonebook"
    console.log(message)
    mongoose.connection.close()
  })


}
else{
  Contact.find({}).then(result => {
    result.forEach(c => {
      console.log(c)
    })
    mongoose.connection.close()
  })


}


