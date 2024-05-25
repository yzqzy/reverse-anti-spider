import express from 'express'

import serverTime from '@server/service/server-time.js'
import toeknVerify from '@server/service/token-verify.js'
import caesarCipherVerify from '@server/service/caesar-cipher-verify.js'
import cookieVerify from '@server/service/cookie-verify.js'
import cookiePlusVerify from '@server/service/cookie-plus-verify.js'
import sessionVerify from '@server/service/session-verify.js'
import linkMethodVerify from '@server/service/link-method-verify.js'
import protobufVerify from '@server/service/protobuf-verify.js'

const router = express.Router()

router.get('/server-time', serverTime)
router.get('/token-verify', toeknVerify)
router.get('/caesar-cipher-verify', caesarCipherVerify)
router.get('/cookie-verify', cookieVerify)
router.get('/cookie-plus-verify', cookiePlusVerify)
router.get('/session-verify', sessionVerify)
router.link('/link-method-verify', linkMethodVerify)
router.post('/protobuf-verify', protobufVerify)

router.use((req, res) => {
  if (req.url.includes('/link-method-verify')) {
    res.status(405).send('Method Not Allowed')
    return
  }
  res.status(404).send('Not Found')
})

export default router
