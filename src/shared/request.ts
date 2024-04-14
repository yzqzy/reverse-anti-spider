import axios from 'axios'
import { aesDecrypt, base64Encrypt } from './encrypt.js'
import { parseCookie } from './tools.js'

const request = axios.create({})

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    const data = error.response?.data || error.message

    if (/<script>/i.test(data)) {
      try {
        const content = data.match(/<script>([\s\S]*?)<\/script>/)[1]
        console.log('Anti-spider script detected:', content)
        console.log('Decrypting content...', parseCookie(document.cookie).sid)
        console.log(
          'Decrypted content:',
          btoa(parseCookie(document.cookie).sid)
        )

        content &&
          eval(aesDecrypt(content, btoa(parseCookie(document.cookie).sid)))
      } catch (error) {
        console.error('Failed to decrypt anti-spider script:', error)
      }
    }

    return Promise.reject(error.message)
  }
)

export default request
