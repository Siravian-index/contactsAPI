import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import infoRouter from './src/routes/infoRoutes.js'
import personsRouter from './src/routes/personsRoutes.js'

const app = express()
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(express.json())
app.use(cors())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(infoRouter)
app.use(personsRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`running on ${PORT}`))
