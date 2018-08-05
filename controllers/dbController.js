const dbRouter = require('express').Router()
const nano = require('nano')(process.env.DB_URL)
const formatter = require('../utils/formatter')
require('dotenv').config()

dbRouter.get('/history', async (req, res) => {
  console.log('couchDB get history')
  try {
    const workhistory = nano.db.use('workhistory')
    const data = await workhistory.list({ include_docs: true })
    res.status(200).send(formatter(data))
  } catch (err) {
    console.error(err)
    res.status(500)
  }
})

dbRouter.get('/education', async (req, res) => {
  console.log('couchDB get education')
  try {
    const education = nano.db.use('education')
    const data = await education.list({ include_docs: true })
    res.status(200).send(formatter(data))
  } catch (err) {
    console.log(err)
    res.status(500)
  }
})

module.exports = dbRouter