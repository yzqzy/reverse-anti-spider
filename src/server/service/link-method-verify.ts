// link method 校验

import { buffersDecrypt, buffersEncrypt } from '@shared/encrypt.js'

export const readBuffer = (req: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body: any = []

    req.on('data', (chunk: any) => {
      body.push(chunk)
    })

    req.on('end', () => {
      body = Buffer.concat(body)
      resolve(body)
    })
  })
}

const verfiyKey = `K5D,G}boR9^_k)LK+rg%`

export default async function (req: any, res: any, next: any) {
  const data = await readBuffer(req)
  console.log(`[link method verify] data:`, data.toString())

  const decryptedText = buffersDecrypt(data, verfiyKey)
  console.log(`[link method verify] decryptedText:`, decryptedText)

  const page = decryptedText.slice(0, -13)
  const serverTime = decryptedText.slice(-13)
  console.log(`[link method verify] Server time: ${serverTime}`)

  const currentTime = Date.now()

  const isExpired = Math.abs(currentTime - +serverTime) > 2 * 1000
  console.log(`[link method verify] Is expired: ${isExpired}`)

  if (!serverTime || serverTime === 'undefined' || isExpired) {
    return res.send('Unauthorized')
  }

  res.set('Content-Type', 'application/octet-stream')
  res.send(Buffer.from(buffersEncrypt('Authorized', verfiyKey + page)))
}
