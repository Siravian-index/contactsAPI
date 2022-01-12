import { data } from '../data/data.js'

export const getInfo = (req, res) => {
  const l = data.length
  const d = new Date()
  res.send(`
    <p>Phonebook has info for ${l} people</p>
    <p>${d}</p>
  `)
}
