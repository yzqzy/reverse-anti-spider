import express from 'express'
import ViteExpress from 'vite-express'
import bodyParser from 'body-parser'

import initMiddlewares from './middleware/index.js'
import lesson05 from './service/lesson05.js'
import lesson06 from './service/lesson06.js'

import { isProd } from './config/index.js'

const app = express()

initMiddlewares(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/lesson05', lesson05)
app.get('/api/lesson06', lesson06)

const port = isProd ? 4300 : 3000
ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
)
