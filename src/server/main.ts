import express from 'express'
import ViteExpress from 'vite-express'
import bodyParser from 'body-parser'

import initMiddlewares from './middleware/index.js'

import serverTime from './service/server-time.js'
import toeknVerify from './service/token-verify.js'
import caesarCipher from './service/caesar-cipher.js'
import cookieVerify from './service/cookie-verify.js'

import { isProd } from './config/index.js'

const app = express()

initMiddlewares(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/server-time', serverTime)

app.get('/api/token-verify', toeknVerify)
app.get('/api/caesar-cipher', caesarCipher)
app.get('/api/cookie-verify', cookieVerify)

const port = isProd ? 4300 : 3000
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
)
