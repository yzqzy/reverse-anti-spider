import express from 'express'
import ViteExpress from 'vite-express'
import bodyParser from 'body-parser'
import session from 'express-session'

import initMiddlewares from './middleware/index.js'
import serverTime from './service/server-time.js'
import toeknVerify from './service/token-verify.js'
import caesarCipherVerify from './service/caesar-cipher-verify.js'
import cookieVerify from './service/cookie-verify.js'
import cookiePlusVerify from './service/cookie-plus-verify.js'
import sessionVerify from './service/session-verify.js'

import { getRandomString } from '@shared/tools.js'

const app = express()

initMiddlewares(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  session({
    secret: `anti_spider_${getRandomString()}`,
    resave: false,
    saveUninitialized: true,
    name: 'spider.sid'
  })
)
app.use((req, res, next) => {
  if (req.url.startsWith('/cookie-verify')) {
    res.cookie('sid', Date.now() + '')
  }
  if (req.url.startsWith('/cookie-plus-verify')) {
    const time = Date.now() + ''
    res.cookie('sid', time)
    req.session.sid = time
  }
  next()
})

app.get('/api/server-time', serverTime)
app.get('/api/token-verify', toeknVerify)
app.get('/api/caesar-cipher-verify', caesarCipherVerify)
app.get('/api/cookie-verify', cookieVerify)
app.get('/api/cookie-plus-verify', cookiePlusVerify)
app.get('/api/session-verify', sessionVerify)

const port = Number(process.env.PORT) || 3000
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
)
