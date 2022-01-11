import { Router } from 'express'
import * as personsController from '../controllers/personsController'

const personsRouter = Router()

personsRouter.get('/api/persons/:id', personsController.getPerson)
personsRouter.get('/api/persons', personsController.getPersons)
personsRouter.delete('/api/persons/:id', personsController.deletePerson)
personsRouter.post('/api/persons', personsController.createPerson)

export default personsRouter