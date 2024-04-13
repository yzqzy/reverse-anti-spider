<template>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@shared/request'
import { desEncrypt } from '@shared/encrypt'
import { getServerTime } from '@client/api/index'

const result = ref('')

onMounted(async () => {
  const time = await getServerTime()
  const text = `${btoa('vunpL5UNKmv3qEvTHhMM')}&${time}`

  document.cookie = `token=${btoa(desEncrypt(text, time + ''))}`

  request.get('/api/cookie-verify', {
    params: {
      t: time
    }
  }).then(() => {
    result.value = 'success'
  }).catch(() => {
    result.value = 'failed'
  })
})
</script>
