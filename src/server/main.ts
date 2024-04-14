import express from 'express'
import ViteExpress from 'vite-express'
import bodyParser from 'body-parser'
import session from 'express-session'
import rateLimit from 'express-rate-limit'

import { isProd } from './config/index.js'
import initMiddlewares from './middleware/index.js'
import serverTime from './service/server-time.js'
import toeknVerify from './service/token-verify.js'
import caesarCipherVerify from './service/caesar-cipher-verify.js'
import cookieVerify from './service/cookie-verify.js'
import cookiePlusVerify from './service/cookie-plus-verify.js'
import sessionVerify from './service/session-verify.js'

const app = express()

initMiddlewares(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (isProd) {
  app.use(
    rateLimit({
      windowMs: 1000 * 60 * 15,
      limit: 100,
      standardHeaders: 'draft-7',
      legacyHeaders: false,
      message:
        'Too many requests from this IP, please try again after a minute.'
    })
  )
}

app.use(
  session({
    secret: 'anti_spider_YhsAGLtVjBVgkEDTRA8D',
    resave: false,
    saveUninitialized: true,
    name: 'spider.sid'
  })
)
app.use((req, res, next) => {
  // console.log(`Request: ${req.method} ${req.url}`)

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

const port = isProd ? 4300 : 3000
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
)
