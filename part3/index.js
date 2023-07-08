const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')


morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan(':method :url :body'))
app.use(cors())

let persons = [
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

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.get('/', function (req, res) {
    res.send("Hello, world")
})

app.get('/api/persons', function (req, res) {
    res.json(persons)
})

app.get('/api/persons/:id', function (req, res) {
  const id = Number(req.params.id)
  const person = persons.filter(person => person.id === id)
  if (person.length !== 0) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', function (req, res) {
    const numPeople = `<p>Phonebook has info for ${persons.length} people</p>`
    const time = `<p>${new Date()}</p>`
    res.send(numPeople + time)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  console.log(body)

  if (!body.name || !body.name) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  if (persons.map(person => person.name).some(name => name === body.name)) {
    return res.status(400).json({ 
      error: 'Name must be unique' 
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)
  res.json(person)
})
  
const PORT = 3001
app.listen(PORT)
