<template>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@shared/request'
import {
  getEncryptParams, caesarCipherEncrypt, base64Encrypt
} from '@shared/encrypt'

const result = ref('')

onMounted(() => {
  const { time, sum } = getEncryptParams()

  request.get('/api/caesar-cipher-verify', {
    params: {
      token: `${caesarCipherEncrypt(time, sum)}&${btoa(sum + '')}`
    }
  }).then((data) => {
    result.value =
      (data as any) === 'Authorized' ? 'success' : 'failed'
  }).catch(() => {
    result.value = 'failed'
  })
})
</script>
