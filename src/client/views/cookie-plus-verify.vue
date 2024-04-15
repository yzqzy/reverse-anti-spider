<template>
  <h2>Cookie Plus Verify</h2>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@shared/request'

const result = ref('')

onMounted(async () => {
  request.get('/api/cookie-plus-verify').then((data: any) => {
    result.value = data
  }).catch(() => {
    result.value = 'failed'
  })
})
</script>
