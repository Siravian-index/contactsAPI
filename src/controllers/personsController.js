import Contact from '../models/personsModels.js'

// GET all
const getPersons = async (req, res) => {
  const persons = await Contact.find({})
  res.json(persons)
}

// GET one
const getPerson = async (req, res) => {
  const { id } = req.params
  try {
    const contact = await Contact.findById(id)
    if (contact) {
      res.json(contact)
    } else {
      res.status(404).end()
    }
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

// DELETE one
const deletePerson = async (req, res) => {
  const { id } = req.params
  try {
    await Contact.findByIdAndDelete(id)
    res.status(204).end()
  } catch (err) {
    console.log(err)
    res.status(500).end()
  }
}

// POST one
const createPerson = async (req, res) => {
  const { name, number } = req.body
  const duplicate = await Contact.findOne({ name })
  if (duplicate) {
    return res.json({ error: 'name must be unique' })
  }
  if (!name) {
    return res.json({ error: 'contacts must contain a name' })
  }
  if (!number) {
    return res.json({ error: 'contacts must contain a number' })
  }
  const newContact = new Contact({ name, number })
  await newContact.save()
  return res.json(newContact)
}

export { getPerson, getPersons, deletePerson, createPerson }
