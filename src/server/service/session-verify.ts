// session 保持校验

import { getRandomString, parseCookie } from '@shared/tools.js'

export default function (req: any, res: any, next: any) {
  const cookie = parseCookie(req.headers.cookie)
  const { page } = req.query

  console.log(`[session verify] page: ${page}`)

  if (page != 1) {
    const token = req.session.token

    console.log(`[session verify] token: ${token}`)

    if (!token) {
      return res.send('Unauthorized')
    }

    const [key, value] = token.split('&')
    const sign = cookie[key]

    if (!token || !sign) {
      return res.send('Unauthorized')
    }
    if (value !== sign) {
      return res.send('Unauthorized')
    }
  }

  const key = getRandomString()
  const value = getRandomString()

  console.log(`[session verify] key: ${key}, value: ${value}`)

  req.session.token = `${key}&${value}`

  Object.keys(cookie).forEach(k => {
    if (k !== 'spider.sid') res.clearCookie(k)
  })
  res.cookie(key, value)

  res.send('Authorized')
}
