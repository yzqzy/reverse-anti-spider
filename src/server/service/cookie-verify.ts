// cookie 校验

import { jsonStringify, parseCookie } from '@shared/tools.js'
import { desDecrypt } from '@shared/encrypt.js'

export default function (req: any, res: any, next: any) {
  const time = (req.query || {}).t
  const cookie = parseCookie(req.headers.cookie)

  console.log(`[cookie verify] time: ${time}`)
  console.log(`[cookie verify] Cookie: ${jsonStringify(cookie)}`)

  const token = cookie.token

  console.log(`[cookie verify] Token: ${token}`)

  if (!token || !time) {
    return res.status(401).send('Unauthorized')
  }

  const decryptedText = desDecrypt(token, time)
  console.log(`[cookie verify] Decrypted text: ${decryptedText}`)

  const serverTime = decryptedText.split('&')[1]
  console.log(`[cookie verify] Server time: ${serverTime}`)

  if (serverTime !== time) {
    return res.status(401).send('Unauthorized')
  }

  res.send('Authorized')
}
