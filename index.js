const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mailRouter = require('./controllers/mailController')
const { logger } = require('./utils/logger')
require('dotenv').config()

app.use(cors())
app.use(bodyParser.json())
app.use(logger)
app.use('/api/mail', mailRouter)

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(error)

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})