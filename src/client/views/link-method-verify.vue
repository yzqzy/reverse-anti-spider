<template>
  <h2>Link Method Verify</h2>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const result = ref('')

onMounted(async () => {
  fetch('/api/link-method-verify', { method: 'LINK' })
    .then(response => {
      if (response.ok) {
        return response.text()
      }
      throw new Error(response.statusText)
    })
    .then(text => {
      result.value = text
    })
    .catch((res) => {
      console.error(res)
      result.value = 'failed'
    })
})
</script>
