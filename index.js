import express from 'express'
import data from './src/data/data.js'

const app = express()

app.use(express.json())

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
  const r = data.filter((c) => c.id !== id)
  if (r) {
    res.json(r)
  } else {
    res.status(404).end()
  }
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
  data.push({ id, name, number })
  return res.json(data)
})

app.listen(3001)
