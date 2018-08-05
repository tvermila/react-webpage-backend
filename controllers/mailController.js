const mailRouter = require('express').Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

mailRouter.post('/api/mail', (request, response) => {
  try {
    const { email, name, message } = request.body

    if(!email || !name || !message ) return response.status(400).send('email, nimi tai viesti puuttuu!')

    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        type: 'OAuth2',
        clientId: process.env.CLIENT_ID2,
        clientSecret: process.env.CLIENT_SECRET2,
        redirect_uris:['https://developers.google.com/oauthplayground']
      }
    })

    let mailData = {
      to: process.env.EMAIL_TO,
      subject: `Yhteydenotto kotisivulta - lähettäjä ${name}`,
      replyTo: email,
      text: message,
      html: `<div>${message}</div>`,
      auth: {
        user: process.env.USER2,
        refreshToken: process.env.REFRESH_TOKEN2,
        accessToken: process.env.ACCESS_TOKEN2
      }
    }

    transporter.sendMail(mailData, (err, info) => {
      if(err) {
        console.log('Lähetys epäonnistui:', err)
        return response.status(401).send(err)
      } else {
        console.log('Lähetys onnistui', info)
        return response.status(200).json({ success: 'Lähetys onnistui!', email, name, message })
      }
    })
  } catch (exception) {
    console.log(exception)
    return response.status(500).json({ error: 'something went wrong.. ' })
  }
})

module.exports = mailRouter