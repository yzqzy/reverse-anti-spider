// protobuf 校验

import { fromProtobuf } from '@shared/protobuf.js'
import { readBuffer } from './link-method-verify.js'

export default async function (req: any, res: any, next: any) {
  console.log(`[protobuf verify] req.url:`, req.url)

  const buffer = await readBuffer(req)
  const data = await fromProtobuf(buffer)
  console.log(`[protobuf verify] data:`, data)

  const { time } = data as any
  console.log(`[protobuf verify] time:`, time)

  const currentTime = parseInt(Date.now() / 1000 + '')
  console.log(`[protobuf verify] currentTime:`, currentTime)

  if (Math.abs(currentTime - time) > 60) {
    console.log(`[protobuf verify] time error`)
    res.status(200).send('Unauthorized')
    return
  }

  res.send('Authorized')
}
