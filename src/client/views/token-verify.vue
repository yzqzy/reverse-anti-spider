<template>
  <h2>Token Verify</h2>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@shared/request'
import { getEncryptParams } from '@shared/encrypt'

const result = ref('')

onMounted(() => {
  const { time, sum } = getEncryptParams()

  request.get('/api/token-verify', {
    params: {
      token: `${time}|${sum}`
    }
  })
    .then((data: any) => {
      result.value =
        data === 'Authorized' ? 'success' : 'failed'
    }).catch(() => {
      result.value = 'failed'
    })
})
</script>
