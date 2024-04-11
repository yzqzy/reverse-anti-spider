import { isProd } from '../config/index.js'

// token: 凯撒密码、ssl 证书

const caesar_cipher_encrypt = (text: string, iv: number) => {
  let result = ''
  for (let i of text) {
    result += String.fromCharCode(i.charCodeAt(0) + iv)
  }
  return result
}

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

    console.log('[lesson6] Received SSL ciphers:', sslCiphers)

    if (typeof sslCiphers === 'string') {
      console.log('[lesson6] SSL Ciphers length:', sslCiphers.length)

      if (sslCiphers.length < 350) {
        res.status(401).send('Unauthorized')
        return
      }
    }
  }

  const params = req.query || {}
  const token = params.token

  console.log(`[lesson6] Token: ${token}`)

  if (!token) {
    return res.status(401).send('Unauthorized')
  }

  try {
    const caesarText = caesar_cipher_decrypt(token, 1014)

    console.log(`[lesson6] Caesar Text: ${caesarText}`)

    if (caesarText && typeof caesarText === 'string') {
      const currentStamp = new Date().getTime()
      const tokenStamp = +caesarText

      console.log(`[lesson6] Current stamp: ${currentStamp}`)
      console.log(`[lesson6] Token stamp: ${tokenStamp}`)

      const timeDiff = Math.abs(currentStamp - tokenStamp)
      const tokenExpired = timeDiff > 10 * 1000

      console.log(`[lesson6] Time Diff: ${timeDiff}`)
      console.log(`[lesson6] Token Expired: ${tokenExpired}`)

      if (tokenExpired) {
        res.status(401).send('Unauthorized')
        return
      }

      res.send('Lesson 6 is completed')
      return
    }

    res.status(401).send('Unauthorized')
  } catch (error) {
    res.status(401).send('Unauthorized')
  }
}
