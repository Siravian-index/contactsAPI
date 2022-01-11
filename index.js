import express from 'express'
// import { data } from './src/data/data.js'
import morgan from 'morgan'
const app = express()

let data = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.get('/info', (req, res) => {
  const l = data.length
  const d = new Date()
  res.send(`
    <p>Phonebook has info for ${l} people</p>
    <p>${d}</p>
  `)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const contact = data.find((c) => c.id === id)
  if (contact) {
    res.json(contact)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  data = data.filter((c) => c.id !== id)
  res.status(204).end()
})

app.get('/api/persons', (req, res) => {
  res.json(data)
})

app.post('/api/persons', (req, res) => {
  const id = Math.floor(Math.random() * 9999)
  const { name, number } = req.body
  const duplicate = data.find((c) => c.name === name)
  if (duplicate) {
    return res.json({ error: 'name must be unique' })
  }
  if (!name) {
    return res.json({ error: 'contacts must contain a name' })
  }
  if (!number) {
    return res.json({ error: 'contacts must contain a number' })
  }
  data = data.concat({ id, name, number })
  return res.json(data)
})

app.listen(3001)
