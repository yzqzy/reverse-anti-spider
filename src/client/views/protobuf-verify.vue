<template>
  <h2>Protobuf Verify</h2>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import protobuf from 'protobufjs'
import { ref, onMounted } from 'vue'

const result = ref('')

const toProtobuf = (payload = {}) => {
  return new Promise((resolve, reject) => {
    protobuf.load('./protobuf/test.proto', (err, root) => {
      if (err || !root) {
        console.error(err)
        reject(`Protobuf load failed: ${err}`)
        return
      }

      const Msg = root.lookupType('TestMessage.Msg')

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

onMounted(() => {
  ; (async () => {
    try {
      const buffer = await toProtobuf({
        key: 'test',
        text: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        time: Date.now(),
        is_published: true,
      })
      console.log(buffer)
    } catch (error: any) {
      result.value = typeof error === 'object' ? error.message : error
    }
  })()
})
</script>