import express from 'express'
import dotenv from 'dotenv'
import ViteExpress from 'vite-express'
import bodyParser from 'body-parser'
import session from 'express-session'

import { getRandomString } from '@shared/tools.js'
import initMiddlewares from './middleware/index.js'
import router from './router/index.js'

dotenv.config()

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

app.use('/api', router)

const port = Number(process.env.PORT) || 3000
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
)
