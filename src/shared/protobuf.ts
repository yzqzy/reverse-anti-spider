import protobuf from 'protobufjs'

export const toProtobuf = (payload = {}) => {
  return new Promise((resolve, reject) => {
    protobuf.load('./protobuf/params.proto', (err, root) => {
      if (err || !root) {
        console.error(err)
        reject(`Protobuf load failed: ${err}`)
        return
      }

      const Msg = root.lookupType('Params.Msg')

      const errMsg = Msg.verify(payload)
      if (errMsg) {
        reject(`Protobuf verify failed: ${errMsg}`)
        return
      }

      const message = Msg.create(payload)
      const buffer = Msg.encode(message).finish()

      resolve(buffer)
    })
  })
}

export const fromProtobuf = (buffer: Buffer) => {
  return new Promise((resolve, reject) => {
    protobuf.load('./public/protobuf/params.proto', (err, root) => {
      if (err || !root) {
        console.error(err)
        reject(`Protobuf load failed: ${err}`)
        return
      }

      const Msg = root.lookupType('Params.Msg')

      const message = Msg.decode(buffer)
      const payload = Msg.toObject(message, {
        defaults: true,
        arrays: true,
        objects: true,
        oneofs: true
      })

      resolve(payload)
    })
  })
}
