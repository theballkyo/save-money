const Router = require('koa-router')
// const hashids = require('../utils/hashids')
// const models = require('../models')

const router = Router({
  prefix: ''
})

const getHome = async (ctx, next) => {
  // await models.Wallet.create({name: 'ABC', userId: 'ddd'})
  // const wallet = await models.Wallet.find()
  ctx.body = 'Hello, Home'
}

router.get('/', getHome)

router.get('/login', async (ctx) => {
  ctx.body = 'Login !'
})

module.exports = router
