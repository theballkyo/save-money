'use strict'
const mongoose = require('mongoose')
let _dbs = {}

// Set Promise
mongoose.Promise = global.Promise

const addDB = (name, url, options) => {
  if (!_dbs[name]) {
    const conn = mongoose.createConnection(url, options || {})
    _dbs[name] = conn
  }
  return _dbs[name]
}

const getDB = (name) => {
  if (!name) {
    return _dbs['default']
  }
  return _dbs[name]
}

const getMongoose = () => {
  return mongoose
}

// You can add _dbs here
_dbs['default'] = mongoose.createConnection(process.env.MONGO_URL_DEFAULT)

module.exports = {
  getDB,
  addDB,
  getMongoose
}
