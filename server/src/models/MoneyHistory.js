'use strict'
const dataSource = require('../dataSource')
const db = dataSource.getDB()
const Schema = dataSource.getMongoose().Schema

const MoneyHistorySchema = new Schema({
  name: 'string'
})

const MoneyHistory = db.model('MoneyHistory', MoneyHistorySchema)

module.exports = MoneyHistory
