// token: 凯撒密码、ssl 证书

import { isProd } from '@server/config/index.js'

const caesar_cipher_decrypt = (text: string, iv: number) => {
  let result = ''
  for (let i of text) {
    result += String.fromCharCode(i.charCodeAt(0) - iv)
  }
  return result
}

export default function (req: any, res: any, next: any) {
  if (isProd) {
    const sslCiphers = req.headers['x-ssl-ciphers'] || ''

    console.log('[lesson06] Received SSL ciphers:', sslCiphers)

    if (typeof sslCiphers === 'string') {
      console.log('[lesson06] SSL Ciphers length:', sslCiphers.length)

      if (sslCiphers.length < 350) {
        res.status(401).send('Unauthorized')
        return
      }
    }
  }

  const params = req.query || {}
  const token = params.token

  if (!token) {
    return res.status(401).send('Unauthorized')
  }

  try {
    const tokens = token.split('&')
    const text = tokens[0]
    const iv = tokens[1]

    const caesarText = caesar_cipher_decrypt(text, iv)

    console.log(`[lesson06] Caesar Text: ${caesarText}`)

    if (caesarText && typeof caesarText === 'string') {
      const currentStamp = new Date().getTime()
      const tokenStamp = +caesarText

      console.log(`[lesson06] Current stamp: ${currentStamp}`)
      console.log(`[lesson06] Token stamp: ${tokenStamp}`)

      const timeDiff = Math.abs(currentStamp - tokenStamp)
      const tokenExpired = timeDiff > 10 * 1000

      console.log(`[lesson06] Time Diff: ${timeDiff}`)
      console.log(`[lesson06] Token Expired: ${tokenExpired}`)

      if (tokenExpired) {
        res.status(401).send('Unauthorized')
        return
      }

      res.send('Success')
      return
    }

    res.status(401).send('Unauthorized')
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
}
