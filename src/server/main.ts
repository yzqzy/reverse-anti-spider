import express from 'express'
import ViteExpress from 'vite-express'
import bodyParser from 'body-parser'

import initMiddlewares from './middleware/index.js'
import lesson5 from './service/lesson5.js'
import lesson6 from './service/lesson5.js'

import { isProd } from './config/index.js'

const app = express()

initMiddlewares(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/lesson5', lesson5)
app.get('/api/lesson6', lesson6)

app.get('/api/hello', (_, res) => {
  res.send('Hello Vite + Vue + TypeScript!')
})

const port = isProd ? 5000 : 3000

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on port ${port}...`)
)
