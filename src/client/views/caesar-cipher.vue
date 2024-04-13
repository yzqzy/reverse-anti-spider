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

  request.get('/api/caser-cipher', {
    params: {
      token: `${caesarCipherEncrypt(time, sum)}&${base64Encrypt(sum + '')}`
    }
  }).then(() => {
    result.value = 'success'
  }).catch(() => {
    result.value = 'failed'
  })
})
</script>
