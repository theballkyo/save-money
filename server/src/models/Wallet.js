'use strict'
const dataSource = require('../dataSource')
const db = dataSource.getDB()
const Schema = dataSource.getMongoose().Schema

const WalletSchema = new Schema({
  name: 'string',
  userId: 'string'
}, {
  timestamps: {}
})

const Wallet = db.model('Wallet', WalletSchema)

module.exports = Wallet
