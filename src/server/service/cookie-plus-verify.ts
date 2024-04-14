// cookie 校验 plus

import { getRandomString, jsonStringify, parseCookie } from '@shared/tools.js'
import {
  aesEncrypt,
  desDecrypt,
  base64Decrypt,
  base64Encrypt
} from '@shared/encrypt.js'

const desKey = 'wyc.F=!po95TQ]2?c!~C1sW>*DCC>*YA3+237%YH'

const unauthorized = (req: any, res: any) => {
  const jsCode = `import('https://js.yueluo.club/reverse/crypto-es@2.1.0.js')
.then(module => {
  const CryptoJS = module.default;
  const desEncrypt = (text, key) => {
    const keyHex = CryptoJS.enc.Hex.parse(key);
    const encrypted = CryptoJS.DES.encrypt(text, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  };
  const parseCookie = (cookie) => {
    if (!cookie) return {}
    const cookies = cookie.split(';')
    const result = {}
    for (const c of cookies) {
      const [key, value] = c.trim().split('=')
      result[key] = value
    }
    return result
  }
  const time = parseCookie(document.cookie).sid;
  const text = btoa('${getRandomString()}') + '&' + time;
  document.cookie = 'token=' + btoa(desEncrypt(text, '${desKey}'));
  location.reload();
})
.catch(error => {
  console.error(error);
});`
  const script = `<script>${aesEncrypt(
    jsCode,
    base64Encrypt(req.session.sid)
  )}</script>`
  return res.status(401).send(script)
}

export default function (req: any, res: any, next: any) {
  try {
    const cookie = parseCookie(req.headers.cookie)

    console.log(`[cookie plus verify] Cookie: ${jsonStringify(cookie)}`)

    if (!cookie.token) {
      return unauthorized(req, res)
    }

    const token = base64Decrypt(cookie.token)

    console.log(`[cookie plus verify] Token: ${token}`)

    if (!token) {
      return unauthorized(req, res)
    }

    const decryptedText = desDecrypt(token, desKey)
    console.log(`[cookie plus verify] Decrypted text: ${decryptedText}`)

    const serverTime = decryptedText.split('&')[1]
    console.log(`[cookie plus verify] Server time: ${serverTime}`)

    const currentTime = Date.now()

    const isExpired = Math.abs(currentTime - +serverTime) > 5 * 1000
    console.log(`[cookie plus verify] Is expired: ${isExpired}`)

    if (!serverTime || serverTime === 'undefined' || isExpired) {
      return unauthorized(req, res)
    }

    res.cookie('sid', undefined, { maxAge: -1 })
    res.send('Authorized')
  } catch (error) {
    return unauthorized(req, res)
  }
}
