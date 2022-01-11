import { Router } from 'express'
import * as infoController from '../controllers/infoController'

const infoRouter = Router()

infoRouter.get('/info', infoController.getInfo)

export default infoRouter
