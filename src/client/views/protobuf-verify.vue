<template>
  <h2>Protobuf Verify</h2>
  <div class="result">{{ result }}</div>
</template>

<script setup lang="ts">
import request from '@shared/request'
import { ref, onMounted } from 'vue'
import { toProtobuf } from '@shared/protobuf';

const result = ref('')

// need optimization

onMounted(() => {
  ; (async () => {
    try {
      const buffer = await toProtobuf({
        key: 'test',
        time: parseInt((Date.now() / 1000 + '')),
        page: 1
      })
      const data = await request.post('/api/protobuf-verify', buffer, {
        headers: {
          'Content-Type': 'application/x-protobuf'
        }
      })
      result.value = data as any
    } catch (error: any) {
      result.value = typeof error === 'object' ? error.message : error
    }
  })()
})
</script>