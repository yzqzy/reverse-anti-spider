<template>
  <h2>Caesar Cipher Verify</h2>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@shared/request'
import {
  getEncryptParams, caesarCipherEncrypt
} from '@shared/encrypt'

const result = ref('')

onMounted(() => {
  const { time, sum } = getEncryptParams()

  request.get('/api/caesar-cipher-verify', {
    params: {
      token: `${caesarCipherEncrypt(time, sum)}&${btoa(sum + '')}`
    }
  }).then((data: any) => {
    result.value = data
  }).catch(() => {
    result.value = 'failed'
  })
})
</script>
