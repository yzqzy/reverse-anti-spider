import CryptoJS from 'crypto-js'

export const getEncryptParams = (time?: string) => {
  time = time || Date.now() + ''
  const sum = time.split('').reduce((acc, cur) => acc + parseInt(cur), 0)
  return { time, sum }
}

export const base64Encrypt = (text: string) => {
  return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text))
}
export const base64Decrypt = (text: string) => {
  if (!text) return ''
  return CryptoJS.enc.Base64.parse(text).toString(CryptoJS.enc.Utf8)
}

export const aesEncrypt = (text: string, key: string) => {
  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
}
export const aesDecrypt = (text: string, key: string) => {
  const decrypted = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export const desEncrypt = (text: string, key: string) => {
  const encrypted = CryptoJS.DES.encrypt(text, CryptoJS.enc.Hex.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
export const desDecrypt = (text: string, key: string) => {
  const decrypted = CryptoJS.DES.decrypt(text, CryptoJS.enc.Hex.parse(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export const caesarCipherEncrypt = (text: string, iv: number) => {
  let result = ''
  for (let i of text) {
    result += String.fromCharCode(i.charCodeAt(0) + iv)
  }
  return result
}
export const caesarCipherDecrypt = (text: string, iv: number) => {
  let result = ''
  for (let i of text) {
    result += String.fromCharCode(i.charCodeAt(0) - iv)
  }
  return result
}
