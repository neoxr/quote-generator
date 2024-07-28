require('./lib/system/config.js'), require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const PORT = process.env.PORT || 8080
const runServer = async () => {
   const app = express()
   app.set('json spaces', 2)
      .use(express.json())
      .use(require('morgan')('dev'))
      .use(bodyParser.json({
         limit: '50mb'
      }))
      .use(bodyParser.urlencoded({
         limit: '50mb',
         extended: true,
         parameterLimit: 50000
      }))
      .use(express.urlencoded({
         extended: false
      }))
      .use('/', await require('./handler'))
      .get('*', (req, res) => res.json({
      status: false
   }))
   app.disable('x-powered-by')
   app.listen(PORT, () => {
      const CFonts = require('cfonts')
      CFonts.say('Quote-API', {
         font: 'tiny',
         align: 'center',
         colors: ['system']
      }), CFonts.say('Github : https://github.com/neoxr/quote-generator', {
         colors: ['system'],
         font: 'console',
         align: 'center'
      })
      console.log(chalk.yellowBright.bold('Server listening on port --->', PORT))
   })
}

runServer().catch(() => runServer())