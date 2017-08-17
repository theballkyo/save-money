'use strict'
// Load .env
require('dotenv').config()

// Load babel
// require('babel-register')

const app = require('./src/app')

let port = process.env.PORT || 3000

const server = function () {
  app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
  })
}

server()
