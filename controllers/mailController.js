const mailRouter = require('express').Router()
const nodemailer = require('nodemailer')
require('dotenv').config()

mailRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const email = body.email
        const name = body.name
        const message = body.message

        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
              type: 'OAuth2',
              clientId: process.env.CLIENT_ID,
              clientSecret: process.env.CLIENT_SECRET,
              redirect_uris:["http://localhost:3001","https://developers.google.com/oauthplayground"]
            }
          })

          let mailData = {
            to: process.env.EMAIL_TO,
            subject: `Yhteydenotto kotisivulta - lähettäjä ${name}`,
            replyTo: email,
            text: message,
            html: `<div>${message}</div>`,
            auth: {
                user: process.env.USER,
                refreshToken: process.env.REFRESH_TOKEN,
                accessToken: process.env.ACCESS_TOKEN
            }
          }

          transporter.sendMail(mailData, function (err, info) {
            if(err) {
              console.log('Lähetys epäonnistui:', err)
              response.send(err)
            } else {
                console.log('Lähetys onnistui', info)
                response.send('Lähetys onnistui!')
            }             
         })
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong.. '})
    }
})

module.exports = mailRouter