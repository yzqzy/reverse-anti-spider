<template>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@shared/request'
import { desEncrypt, base64Encrypt } from '@shared/encrypt'
import { getServerTime } from '@client/api/index'

const result = ref('')

onMounted(async () => {
  const time = await getServerTime()
  const text = `${base64Encrypt('time')}&${time}`

  document.cookie = `token=${desEncrypt(text, time + '')}`

  request.get('/api/cookie-verify', {
    params: {
      t: `${time}`
    }
  }).then(() => {
    result.value = 'success'
  }).catch(() => {
    result.value = 'failed'
  })
})
</script>
