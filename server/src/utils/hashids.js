const Hashids = require('hashids')
const hashids = new Hashids(process.env.HASHIDS_NAME || '')

module.exports = hashids
