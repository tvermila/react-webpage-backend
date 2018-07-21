const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mailRouter = require('./controllers/mailController')


app.use(cors())
app.use(bodyParser.json())

const logger = (request, response, next) => {
  console.log('Method:',request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(logger)

app.use('/api/mail', mailRouter)

const error = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(error)

const port = 3001
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
