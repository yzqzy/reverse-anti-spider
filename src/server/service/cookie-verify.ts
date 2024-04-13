// cookie 校验

import { jsonStringify, parseCookie } from '@shared/tools.js'
import { desDecrypt, base64Decrypt } from '@shared/encrypt.js'

export default function (req: any, res: any, next: any) {
  const time = base64Decrypt((req.query || {}).t)
  const cookie = parseCookie(req.headers.cookie)

  console.log(`[cookie verify] time: ${time}`)
  console.log(`[cookie verify] Cookie: ${jsonStringify(cookie)}`)

  if (!time) {
    return res.status(401).send('Unauthorized')
  }

  const token = base64Decrypt(cookie.token)

  console.log(`[cookie verify] Token: ${token}`)

  if (!token || !time) {
    return res.status(401).send('Unauthorized')
  }

  const decryptedText = desDecrypt(token, time)
  console.log(`[cookie verify] Decrypted text: ${decryptedText}`)

  const serverTime = decryptedText.split('&')[1]
  console.log(`[cookie verify] Server time: ${serverTime}`)

  const currentTime = Date.now()

  const isExpired = Math.abs(currentTime - +serverTime) > 1000
  console.log(`[cookie plus verify] Is expired: ${isExpired}`)

  if (!serverTime || serverTime === 'undefined' || isExpired) {
    return res.status(401).send('Unauthorized')
  }

  res.cookie('sid', undefined, { maxAge: -1 })
  res.send('Authorized')
}
