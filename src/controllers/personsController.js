import { data } from '../data/data'

// GET all
const getPersons = (req, res) => {
  res.json(data)
}

// GET one
const getPerson = (req, res) => {
  const id = Number(req.params.id)
  const contact = data.find((c) => c.id === id)
  if (contact) {
    res.json(contact)
  } else {
    res.status(404).end()
  }
}

// DELETE one
const deletePerson = (req, res) => {
  const id = Number(req.params.id)
  data = data.filter((c) => c.id !== id)
  res.status(204).end()
}

// POST one
const createPerson = (req, res) => {
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
}

export { getPerson, getPersons, deletePerson, createPerson }
