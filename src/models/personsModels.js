import mongoose from 'mongoose'
const { Schema, model } = mongoose

const contactSchema = new Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
})

// This set on the "toJSON" method is to modified the returned Obj
// by changing de id to a string and removing some unnecessary information
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Contact = model('contact', contactSchema)
export default Contact
