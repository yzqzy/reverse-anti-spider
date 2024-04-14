import axios from 'axios'
import { aesDecrypt } from './encrypt.js'
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
        const sid = parseCookie(document.cookie).sid
        if (!sid) {
          window.location.reload()
          return
        }
        if (content && content !== 'undefined') {
          eval(aesDecrypt(content, btoa(parseCookie(document.cookie).sid)))
        }
        return Promise.resolve('temp')
      } catch (error) {
        console.error('Failed to decrypt anti-spider script:', error)
      }
    }

    return Promise.reject(error.message)
  }
)

export default request
