const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
require('dotenv').config()
const url = process.env.MONGO_URI

console.log('connecting to', url)

mongoose.connect(url)
  .then(console.log('connected to MongoDB'))
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const minLength = n => n.length >= 8
const correctFormat = n => /\d{2,3}-\d/.test(n)

const many = [
  { validator: minLength, message: 'must have a length of 8' },
  { validator: correctFormat, message: 'must be correct format' }
]

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3
  },
  number: {
    type: String,
    validate: many
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)