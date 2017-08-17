'use strict'
const Koa = require('koa')
const app = new Koa()

const koaBody = require('koa-body')
const json = require('koa-json')
const jwt = require('koa-jwt')
const fs = require('fs')
const fse = require('fs-extra')
const cors = require('kcors')
const path = require('path')
const passport = require('koa-passport')
// Sessions
const session = require('koa-session')
app.keys = ['secret']
app.use(session({}, app))

app.use(json())
app.use(cors())

app.use(passport.initialize())
app.use(passport.session())

// JWT
app.use(
  jwt({
    secret: process.env.JWT_SECRET || 'USE .env AND CHANGE JWT_SECRET',
    passthrough: true
  }).unless({ path: [/^\/public/] })
)

// Use BodyParser
app.use(
  koaBody({
    formLimit: '100mb',
    multipart: true,
    formidable: {
      maxFieldsSize: 10 * 1024 * 1024
      // uploadDir: path.join(
      //   path.dirname(require.main.filename || process.mainModule.filename),
      //   '../',
      //   'storage',
      //   'temp'
      // )
    }
  })
)

/**
 * Remove files in temp folder before next
 */
app.use(async (ctx, next) => {
  await next()
  if (ctx.request.body.files) {
    const files = ctx.request.body.files
    if (files) {
      Object.keys(files).map(async (key, index) => {
        if (files[key] != null) {
          // If multiple files
          if (Array.isArray(files[key])) {
            files[key].forEach(async file => {
              const exists = await fse.pathExists(file.path)
              if (exists) {
                try {
                  await fse.remove(file.path)
                } catch (e) {
                  console.log(e)
                }
              }
            })
          } else {
            const exists = await fse.pathExists(files[key].path)
            if (exists) {
              try {
                await fse.remove(files[key].path)
              } catch (e) {
                console.log(e)
              }
            }
          }
        }
      })
    }
  }
})

// Error handlers
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.log(err)
    // will only respond with JSON
    const errCode = err.statusCode || err.status || 500
    ctx.status = errCode
    if (err.status === 401) {
      ctx.body = {
        message: 'You can\'t access here \n'
      }
    } else {
      ctx.body = {
        message: err.message
      }
    }
  }
})

// Load all Controllers
fs.readdirSync(path.join(__dirname, 'controllers')).forEach(fileName => {
  const controller = require(`./controllers/${fileName}`)
  app.use(controller.routes())
})

module.exports = app
