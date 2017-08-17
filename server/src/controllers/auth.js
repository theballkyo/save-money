const Router = require('koa-router')
const Axios = require('axios')
const router = new Router({
  prefix: '/auth'
})

const credentials = require('../credentials.json')

router.post('/facebook', async ctx => {
  const res = await Axios.post(
    'https://graph.facebook.com/v2.4/oauth/access_token',
    {
      client_id: credentials.facebook.app_id,
      client_secret: credentials.facebook.app_secret,
      code: ctx.request.body.code,
      redirect_uri: ctx.request.body.redirectUri
    },
    { 'Content-Type': 'application/json' }
  )
  ctx.body = res.data
})

router.all('/callback', async ctx => {
  console.log('aa')
  ctx.body = 'aa'
})

module.exports = router
