const rootRouter = require('express').Router()

rootRouter.get('/', (req, res) => {
  res.send('<html><head></head><body><h1>Tämä on NodeJS-palvelin</h1>'+
    '<ul><li>Sähköpostit POST-pyynnöllä /api/mail polkuun</li></ul></body></html>')
})

rootRouter.post('/', (req, res) => {
  res.send('POST toimii!')
})

module.exports = rootRouter