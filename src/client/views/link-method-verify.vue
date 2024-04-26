<template>
  <h2>Link Method Verify</h2>

  <div class="result">{{ result }}</div>

  <p>
    <el-pagination :part="page" background layout="prev, pager, next" :total="100" @current-change="verify" />
  </p>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@shared/request'
import { buffersEncrypt, buffersDecrypt } from '@shared/encrypt';

const result = ref('')
const page = ref(1)

const verify = async (page: number) => {
  try {
    const response = await request.get('/api/server-time') as any

    const verifyKey = `K5D,G}boR9^_k)LK+rg%`
    const data = `${page}${response.time}`

    fetch('/api/link-method-verify',
      {
        method: 'LINK',
        body: buffersEncrypt(data, verifyKey),
      })
      .then(response => {
        if (response.ok) return response.arrayBuffer()
        throw new Error(response.statusText)
      })
      .then(buffer => {
        result.value = `${page} ${buffersDecrypt(buffer, verifyKey + page)}`
      })
      .catch(() => {
        result.value = 'failed'
      })
  } catch (error) {
    result.value = 'failed'
  }
}

onMounted(() => {
  verify(page.value)
})
</script>
