// 凯撒密码、ssl 证书校验

import { isProd } from '@server/config/index.js'
import { base64Decrypt, caesarCipherDecrypt } from '@shared/encrypt.js'

export default function (req: any, res: any, next: any) {
  if (isProd) {
    const sslCiphers = req.headers['x-ssl-ciphers'] || ''

    console.log('[caesar cipher] Received SSL ciphers:', sslCiphers)

    if (typeof sslCiphers === 'string') {
      console.log('[caesar cipher] SSL Ciphers length:', sslCiphers.length)

      if (sslCiphers.length < 350) {
        res.send('Unauthorized')
        return
      }
    }
  }

  const params = req.query || {}
  const token = params.token

  if (!token) {
    return res.send('Unauthorized')
  }

  try {
    const tokens = token.split('&')
    const text = tokens[0]
    const iv = base64Decrypt(tokens[1])

    const caesarText = caesarCipherDecrypt(text, +iv)

    console.log(`[caesar cipher] Caesar Text: ${caesarText}`)

    if (caesarText && typeof caesarText === 'string') {
      const currentStamp = new Date().getTime()
      const tokenStamp = +caesarText

      console.log(`[caesar cipher] Current stamp: ${currentStamp}`)
      console.log(`[caesar cipher] Token stamp: ${tokenStamp}`)

      const timeDiff = Math.abs(currentStamp - tokenStamp)
      const tokenExpired = timeDiff > 10 * 1000

      console.log(`[caesar cipher] Time Diff: ${timeDiff}`)
      console.log(`[caesar cipher] Token Expired: ${tokenExpired}`)

      if (tokenExpired) {
        res.send('Unauthorized')
        return
      }

      res.send('Authorized')
      return
    }

    res.send('Unauthorized')
  } catch (error) {
    res.send('Unauthorized')
  }
}
