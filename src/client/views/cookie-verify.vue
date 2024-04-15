<template>
  <h2>Cookie Verify</h2>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@shared/request'
import { desEncrypt } from '@shared/encrypt'
import { parseCookie } from '../../shared/tools';

const result = ref('')

onMounted(async () => {
  const time = parseCookie(document.cookie).sid

  if (!time) {
    window.location.reload()
    return
  }

  const text = `${btoa('vunpL5UNKmv3qEvTHhMM')}&${time}`

  document.cookie = `token=${btoa(desEncrypt(text, time + ''))}`

  request.get('/api/cookie-verify', {
    params: {
      t: btoa(time)
    }
  }).then((data: any) => {
    result.value = data
  }).catch(() => {
    result.value = 'failed'
  })
})
</script>
