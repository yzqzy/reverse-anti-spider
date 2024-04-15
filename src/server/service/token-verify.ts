// 时间戳、token 校验

import { getEncryptParams } from '@shared/encrypt.js'

export default function (req: any, res: any, next: any) {
  const params = req.query || {}
  const token = params.token

  console.log(`[token verify] Token: ${token}`)

  if (!token) {
    return res.send('Unauthorized')
  }

  const tokens = token.split('|')
  const time = tokens[0]
  const sum = tokens[1]

  console.log(`[token verify] Time: ${time}, Sum: ${sum}`)

  const checkSum = getEncryptParams(time).sum

  console.log(`[token verify] Sum: ${sum}, Checksum: ${checkSum}`)

  if (sum != checkSum) {
    return res.send('Unauthorized')
  }

  res.send('Authorized')
}
